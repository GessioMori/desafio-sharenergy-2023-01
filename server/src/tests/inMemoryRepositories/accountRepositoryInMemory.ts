import { Types } from 'mongoose';
import { ICreateAccountDTO } from '../../modules/account/dtos/ICreateAccountDTO';
import { IAccount } from '../../modules/account/models/IAccount';
import { IAccountRepository } from '../../modules/account/repositories/IAccountRepository';

export class AccountRepositoryInMemory implements IAccountRepository {
  itens: IAccount[] = [];

  async createAccount({
    username,
    password,
  }: ICreateAccountDTO): Promise<IAccount> {
    const newAccount: IAccount = {
      _id: new Types.ObjectId(),
      username,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.itens.push(newAccount);
    return newAccount;
  }

  async findAccountByUsername(username: string): Promise<IAccount | null> {
    const account = this.itens.find((account) => account.username === username);
    if (account == null) {
      return null;
    }
    return account;
  }
}
