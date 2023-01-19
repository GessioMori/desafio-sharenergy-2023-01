import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { Error } from 'mongoose';
import { AppError } from '../../../utils/errors/AppError';

export const ErrorHandler = (
  err: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof ZodError) {
    return response.status(400).json(err.errors);
  }
  if (err instanceof Error.CastError) {
    return response.status(400).json(err.message);
  }
  return response.status(500).json({
    status: 'error',
    message: `Internal server error: ${err.message}`,
  });
};
