import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { ICreateAccountDTO } from '../../../modules/account/dtos/ICreateAccountDTO';
import { IAccountRepository } from '../../../modules/account/repositories/IAccountRepository';
import { CreateAccountService } from '../../../modules/account/services/createAccount.service';
import { AccountRepositoryInMemory } from '../../inMemoryRepositories/accountRepositoryInMemory';
import { LoginService } from '../../../modules/account/services/login.service';

describe('Login service', () => {
  let accountRepository: IAccountRepository;
  let loginService: LoginService;
  let createAccountService: CreateAccountService;

  beforeEach(() => {
    accountRepository = new AccountRepositoryInMemory();
    loginService = new LoginService(accountRepository);
    createAccountService = new CreateAccountService(accountRepository);
  });

  it('Should be able to login with correct credentials', async () => {
    const accountData: ICreateAccountDTO = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    await createAccountService.execute({
      username: accountData.username,
      password: accountData.password,
    });
    const checkedAccount = await loginService.execute({
      username: accountData.username,
      password: accountData.password,
    });
    expect(checkedAccount).toHaveProperty('_id');
  });

  it('Should not be able to login with incorrect password', async () => {
    const accountData: ICreateAccountDTO = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    await createAccountService.execute({
      username: accountData.username,
      password: accountData.password,
    });
    expect(async () => {
      await loginService.execute({
        username: accountData.username,
        password: `${accountData.password}wrong`,
      });
    }).rejects.toHaveProperty('message', 'Invalid credentials.');
  });
});
