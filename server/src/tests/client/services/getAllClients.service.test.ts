import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { IClientRepository } from '../../../modules/client/repositories/IClientRepository';
import { CreateClientService } from '../../../modules/client/services/createClient.service';
import { ClientRepositoryInMemory } from '../../inMemoryRepositories/clientRepositoryInMemory';
import { GetAllClientsService } from '../../../modules/client/services/getAllClients.service';

describe('Get all clients service', () => {
  let clientRepository: IClientRepository;
  let getAllClientsService: GetAllClientsService;
  let createClientService: CreateClientService;

  beforeEach(() => {
    clientRepository = new ClientRepositoryInMemory();
    getAllClientsService = new GetAllClientsService(clientRepository);
    createClientService = new CreateClientService(clientRepository);
  });

  it('Should be able to get a client by id', async () => {
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
      cpf: '18365006022',
    });
    const clients = await getAllClientsService.execute();

    expect(clients).toHaveLength(2);
  });
});
