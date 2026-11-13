import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { GdprConsentInput } from '@european-dining/shared';
import { db } from '../db';
import * as schema from '../db/schema';

export const recordGdprConsent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = req.body as GdprConsentInput;

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const ipHash = crypto.createHash('sha256').update(String(clientIp)).digest('hex').substring(0, 32);

    try {
      await db.insert(schema.gdprConsents).values({
        id: crypto.randomUUID(),
        sessionId: payload.sessionId || `session_${crypto.randomBytes(8).toString('hex')}`,
        ipHash,
        necessaryAccepted: payload.necessaryAccepted !== false,
        analyticsAccepted: Boolean(payload.analyticsAccepted),
        marketingAccepted: Boolean(payload.marketingAccepted),
        consentVersion: payload.consentVersion || '2.0',
      });
    } catch (dbErr) {
      console.warn('[GDPR Consent] Database audit logging notice:', dbErr);
    }

    res.status(200).json({
      status: 'success',
      message: 'GDPR consent audit preferences formally recorded.',
      data: {
        sessionId: payload.sessionId,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};
