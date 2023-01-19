import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { IClientRepository } from '../../../modules/client/repositories/IClientRepository';
import { CreateClientService } from '../../../modules/client/services/createClient.service';
import { ClientRepositoryInMemory } from '../../inMemoryRepositories/clientRepositoryInMemory';
import { AppError } from '../../../utils/errors/AppError';

describe('Create client service', () => {
  let clientRepository: IClientRepository;
  let createClientService: CreateClientService;

  beforeEach(() => {
    clientRepository = new ClientRepositoryInMemory();
    createClientService = new CreateClientService(clientRepository);
  });

  it('should be able to create a new client', async () => {
    const newClient = await createClientService.execute({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number('###########'),
      address: faker.address.streetAddress(),
      cpf: '63496864036',
    });
    expect(newClient).toHaveProperty('_id');
  });

  it('Should not be able to create a new client with an alredy registered cpf', () => {
    expect(async () => {
      await createClientService.execute({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('###########'),
        address: faker.address.streetAddress(),
        cpf: '63496864036',
      });
      await createClientService.execute({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('###########'),
        address: faker.address.streetAddress(),
        cpf: '63496864036',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new client with an alredy registered email', () => {
    expect(async () => {
      const email = faker.internet.email();
      await createClientService.execute({
        name: faker.name.fullName(),
        email,
        phoneNumber: faker.phone.number('###########'),
        address: faker.address.streetAddress(),
        cpf: '63496864036',
      });
      await createClientService.execute({
        name: faker.name.fullName(),
        email,
        phoneNumber: faker.phone.number('###########'),
        address: faker.address.streetAddress(),
        cpf: '27134610063',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
