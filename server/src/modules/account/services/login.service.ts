import { inject, injectable } from 'tsyringe';
import { verify } from 'argon2';
import { AppError } from '../../../utils/errors/AppError';
import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';
import { IAccountRepository } from '../repositories/IAccountRepository';
import { loginSchema } from '../validators/login.schema';

@injectable()
export class LoginService {
  constructor(
    @inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute({ password, username }: ICreateAccountDTO) {
    loginSchema.parse({ username, password });

    const account = await this.accountRepository.findAccountByUsername(
      username,
    );

    if (account == null) {
      throw new AppError('Invalid credentials.', 401);
    }

    const isPasswordCorrect = await verify(account.password, password);

    if (!isPasswordCorrect) {
      throw new AppError('Invalid credentials.', 401);
    }

    const mappedAccount = {
      username: account.username,
      createdAt: account.createdAt,
      _id: account._id,
    };

    return mappedAccount;
  }
}
