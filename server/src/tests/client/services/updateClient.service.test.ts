import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { IClientRepository } from '../../../modules/client/repositories/IClientRepository';
import { CreateClientService } from '../../../modules/client/services/createClient.service';
import { UpdateClientService } from '../../../modules/client/services/updateClient.service';
import { ClientRepositoryInMemory } from '../../inMemoryRepositories/clientRepositoryInMemory';

describe('Update client service', () => {
  let clientRepository: IClientRepository;
  let updateClientService: UpdateClientService;
  let createClientService: CreateClientService;

  beforeEach(() => {
    clientRepository = new ClientRepositoryInMemory();
    updateClientService = new UpdateClientService(clientRepository);
    createClientService = new CreateClientService(clientRepository);
  });

  it("Should be able to update a client's address by id", async () => {
    const address = faker.address.streetAddress();
    const newClient = await createClientService.execute({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number('###########'),
      address: faker.address.streetAddress(),
      cpf: '63496864036',
    });
    const updatedClient = await updateClientService.execute({
      id: newClient._id.toString(),
      address,
    });
    expect(updatedClient.address).toBe(address);
  });
});
