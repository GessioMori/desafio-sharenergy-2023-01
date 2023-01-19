import { Model } from 'mongoose';
import { ICreateAccountDTO } from '../../dtos/ICreateAccountDTO';
import { IAccount } from '../../models/IAccount';
import { Account } from '../../models/mongo/account.model';
import { IAccountRepository } from '../IAccountRepository';

export class AccountRepository implements IAccountRepository {
  private readonly repository: Model<IAccount>;

  constructor() {
    this.repository = Account;
  }

  async findAccountByUsername(username: string): Promise<IAccount | null> {
    const account = await this.repository.findOne({ username });

    return account;
  }

  async createAccount({
    password,
    username,
  }: ICreateAccountDTO): Promise<IAccount> {
    const newAccount = await this.repository.create({ username, password });

    return newAccount;
  }
}
