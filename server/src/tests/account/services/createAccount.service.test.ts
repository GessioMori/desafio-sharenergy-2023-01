import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { ICreateAccountDTO } from '../../../modules/account/dtos/ICreateAccountDTO';
import { IAccountRepository } from '../../../modules/account/repositories/IAccountRepository';
import { CreateAccountService } from '../../../modules/account/services/createAccount.service';
import { AccountRepositoryInMemory } from '../../inMemoryRepositories/accountRepositoryInMemory';
import { AppError } from '../../../utils/errors/AppError';

describe('Create account service', () => {
  let accountRepository: IAccountRepository;
  let createAccountService: CreateAccountService;

  beforeEach(() => {
    accountRepository = new AccountRepositoryInMemory();
    createAccountService = new CreateAccountService(accountRepository);
  });

  it('Should be able to create an account with correct credentials', async () => {
    const createAccountData: ICreateAccountDTO = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const newAccount = await createAccountService.execute({
      username: createAccountData.username,
      password: createAccountData.password,
    });
    expect(newAccount).toHaveProperty('_id');
  });

  it('Should not be able to create an account with an already registered username', () => {
    const createAccountData: ICreateAccountDTO = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    expect(async () => {
      await createAccountService.execute({
        username: createAccountData.username,
        password: createAccountData.password,
      });
      await createAccountService.execute({
        username: createAccountData.username,
        password: createAccountData.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
