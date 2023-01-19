import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { IClientRepository } from '../../../modules/client/repositories/IClientRepository';
import { CreateClientService } from '../../../modules/client/services/createClient.service';
import { GetClientService } from '../../../modules/client/services/getClient.service';
import { ClientRepositoryInMemory } from '../../inMemoryRepositories/clientRepositoryInMemory';

describe('Get client service', () => {
  let clientRepository: IClientRepository;
  let getClientService: GetClientService;
  let createClientService: CreateClientService;

  beforeEach(() => {
    clientRepository = new ClientRepositoryInMemory();
    getClientService = new GetClientService(clientRepository);
    createClientService = new CreateClientService(clientRepository);
  });

  it('Should be able to get a client by id', async () => {
    const newClient = await createClientService.execute({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number('###########'),
      address: faker.address.streetAddress(),
      cpf: '63496864036',
    });
    const client = await getClientService.execute({
      id: newClient._id.toString(),
    });

    expect(client).toHaveProperty('_id');
  });
});
