import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const isProduction = env.NODE_ENV === 'production';

  // In production, debug logs and stack traces are suppressed
  if (!isProduction) {
    console.error(`[Error] ${err.name}: ${err.message}`);
    if (err.stack) {
      console.error(err.stack);
    }
  }

  res.status(statusCode).json({
    status: 'error',
    code: err.code || 'INTERNAL_SERVER_ERROR',
    message: isProduction && statusCode === 500
      ? 'An unexpected European reservation system error occurred. Please contact the concierge.'
      : err.message,
    ...(isProduction ? {} : { stack: err.stack }),
  });
};
