import { container } from 'tsyringe';
import { IClientRepository } from '../modules/client/repositories/IClientRepository';
import { ClientRepository } from '../modules/client/repositories/mongo/client.repository';

container.registerSingleton<IClientRepository>(
  'ClientRepository',
  ClientRepository,
);
