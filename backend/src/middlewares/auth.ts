import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { env } from '../config/env';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * Timing-safe password hashing using SHA-512 with PBKDF2 salt
 */
export const hashPassword = (password: string, salt: string = crypto.randomBytes(16).toString('hex')): { hash: string; salt: string } => {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
};

export const verifyPassword = (password: string, hash: string, salt: string): boolean => {
  const checkHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(checkHash, 'hex'));
};

/**
 * Protect Admin Routes: Requires Bearer Authorization Token
 */
export const requireAdminAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      status: 'error',
      code: 'UNAUTHORIZED',
      message: 'Authentication token required for managerial route access',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  // Timing safe token comparison against system secret using cryptographic hashes
  const tokenHash = crypto.createHash('sha256').update(token).digest();
  const expectedHash = crypto.createHash('sha256').update(env.JWT_SECRET).digest();
  const isMatch = crypto.timingSafeEqual(tokenHash, expectedHash);

  if (!isMatch) {
    res.status(403).json({
      status: 'error',
      code: 'FORBIDDEN',
      message: 'Invalid administrative privileges',
    });
    return;
  }

  req.user = {
    id: 'admin-master-id',
    email: 'concierge@letoile-terroir.fr',
    role: 'super_admin',
  };

  next();
};
