import { NextFunction, Request, Response } from 'express';
import { Account } from '../../../modules/account/models/mongo/account.model';
import { AppError } from '../../../utils/errors/AppError';

export const AuthMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { userId } = request.signedCookies;

  if (!userId) {
    throw new AppError('Cookie not received.', 401);
  }

  const account = await Account.findById(userId);

  if (account == null) {
    throw new AppError('Account not found.', 401);
  }

  request.accountId = account._id.toString();

  next();
};
