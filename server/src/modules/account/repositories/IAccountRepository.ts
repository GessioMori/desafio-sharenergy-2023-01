import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';
import { IAccount } from '../models/IAccount';

export interface IAccountRepository {
  createAccount: (data: ICreateAccountDTO) => Promise<IAccount>;
  findAccountByUsername: (username: string) => Promise<IAccount | null>;
}
