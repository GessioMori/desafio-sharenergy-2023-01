import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { IClientRepository } from '../../../modules/client/repositories/IClientRepository';
import { CreateClientService } from '../../../modules/client/services/createClient.service';
import { ClientRepositoryInMemory } from '../../inMemoryRepositories/clientRepositoryInMemory';
import { DeleteClientService } from '../../../modules/client/services/deleteClient.service';

describe('Update client service', () => {
  let clientRepository: IClientRepository;
  let deleteClientService: DeleteClientService;
  let createClientService: CreateClientService;

  beforeEach(() => {
    clientRepository = new ClientRepositoryInMemory();
    deleteClientService = new DeleteClientService(clientRepository);
    createClientService = new CreateClientService(clientRepository);
  });

  it('Should be able to delete a client by id', async () => {
    const newClient = await createClientService.execute({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number('###########'),
      address: faker.address.streetAddress(),
      cpf: '63496864036',
    });
    await deleteClientService.execute({
      id: newClient._id.toString(),
    });
    const clients = await clientRepository.getAllClients();

    expect(clients).toHaveLength(0);
  });
});
