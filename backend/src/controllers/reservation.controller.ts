import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { ReservationCreateInput } from '@european-dining/shared';

export const createReservation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = req.body as ReservationCreateInput;

    // Generate unique European reservation confirmation code (e.g., ET-7829-PX)
    const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
    const confirmationCode = `ET-${payload.partySize}${payload.seatingZone[0].toUpperCase()}-${randomSuffix}`;

    const newReservation = {
      id: crypto.randomUUID(),
      confirmationCode,
      restaurantId: payload.restaurantId,
      tableId: payload.tableId || 'auto-assigned',
      seatingZone: payload.seatingZone,
      guestName: payload.guestName,
      guestEmail: payload.guestEmail,
      guestPhone: payload.guestPhone,
      partySize: payload.partySize,
      reservationDate: payload.reservationDate,
      reservationTime: payload.reservationTime,
      dietaryNotes: payload.dietaryNotes || null,
      specialRequests: payload.specialRequests || null,
      status: 'confirmed',
      gdprConsentTimestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    // Calendar payload (.ics format string for direct client sync)
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//European Dining Demos//Reservation Service//EN',
      'BEGIN:VEVENT',
      `UID:${newReservation.id}@letoile-terroir.fr`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:Dinner Reservation: L'Étoile & Terroir (${confirmationCode})`,
      `DESCRIPTION:Table reserved for ${payload.partySize} guests in ${payload.seatingZone.replace('_', ' ').toUpperCase()}`,
      `LOCATION:14 Rue Saint-Honoré, 75001 Paris, France`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    res.status(201).json({
      status: 'success',
      message: 'Your table reservation has been formally confirmed.',
      data: newReservation,
      calendarPayload: icsContent,
    });
  } catch (error) {
    next(error);
  }
};
