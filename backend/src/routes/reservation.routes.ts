import { Router } from 'express';
import { createReservation } from '../controllers/reservation.controller';
import { validate } from '../middlewares/validate';
import { reservationLimiter } from '../middlewares/rateLimiter';
import { ReservationCreateSchema } from '@european-dining/shared';

const router = Router();

// Protected with Zod schema validation and reservation rate limiting
router.post('/', reservationLimiter, validate(ReservationCreateSchema), createReservation);

export default router;
