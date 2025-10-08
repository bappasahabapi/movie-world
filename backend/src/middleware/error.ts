import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errors';

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, 'Not Found'));
};

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err?.status || 500;
  const payload: any = { message: err?.message || 'Server Error' };
  if (err?.details) payload.details = err.details;
  if (process.env.NODE_ENV !== 'production' && err?.stack) payload.stack = err.stack;
  res.status(status).json(payload);
};
