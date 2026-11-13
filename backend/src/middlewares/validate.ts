import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError || error?.name === 'ZodError') {
        res.status(400).json({
          status: 'error',
          code: 'VALIDATION_FAILED',
          message: 'Invalid input payload',
          errors: error.errors?.map((e: any) => ({
            field: e.path?.join('.'),
            message: e.message,
          })) || [],
        });
        return;
      }
      next(error);
    }
  };
};

export const validateQuery = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.query = (await schema.parseAsync(req.query)) as any;
      next();
    } catch (error: any) {
      if (error instanceof ZodError || error?.name === 'ZodError') {
        res.status(400).json({
          status: 'error',
          code: 'INVALID_QUERY_PARAMETERS',
          message: 'Invalid query parameters provided',
          errors: error.errors?.map((e: any) => ({
            field: e.path?.join('.'),
            message: e.message,
          })) || [],
        });
        return;
      }
      next(error);
    }
  };
};
