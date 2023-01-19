import { inject, injectable } from 'tsyringe';
import { hash } from 'argon2';
import { AppError } from '../../../utils/errors/AppError';
import { IAccountRepository } from '../repositories/IAccountRepository';
import { createAccountSchema } from '../validators/createAccount.schema';
import { ILoginDTO } from '../dtos/ILoginDTO';

@injectable()
export class CreateAccountService {
  constructor(
    @inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute({ password, username }: ILoginDTO) {
    createAccountSchema.parse({ username, password });

    const usernameAlreadyRegistered =
      await this.accountRepository.findAccountByUsername(username);

    if (usernameAlreadyRegistered != null) {
      throw new AppError('Username already registered.', 409);
    }

    const hashedPassword = await hash(password);

    const newAccount = await this.accountRepository.createAccount({
      password: hashedPassword,
      username,
    });

    const mappedAccount = {
      username: newAccount.username,
      createdAt: newAccount.createdAt,
      _id: newAccount._id,
    };

    return mappedAccount;
  }
}
