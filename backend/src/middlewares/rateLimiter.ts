import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    code: 'RATE_LIMIT_EXCEEDED',
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});

// Strict reservation rate limiter (prevents booking bots & denial-of-inventory)
export const reservationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 6, // max 6 reservation requests per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    code: 'RESERVATION_LIMIT_EXCEEDED',
    message: 'Reservation limit reached for this session. Please call our concierge directly for immediate assistance.',
  },
});

// Admin brute-force protection
export const adminAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 failed attempts per 15 mins
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    code: 'AUTH_LOCKOUT',
    message: 'Too many failed authentication attempts. Account temporarily locked.',
  },
});
