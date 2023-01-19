import { container } from 'tsyringe';
import { IAccountRepository } from '../modules/account/repositories/IAccountRepository';
import { AccountRepository } from '../modules/account/repositories/mongo/account.repository';

container.registerSingleton<IAccountRepository>(
  'AccountRepository',
  AccountRepository,
);
