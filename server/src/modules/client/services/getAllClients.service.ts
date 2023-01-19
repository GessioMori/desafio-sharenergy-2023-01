import { inject, injectable } from 'tsyringe';
import { IClientRepository } from '../repositories/IClientRepository';

@injectable()
export class GetAllClientsService {
  constructor(
    @inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute() {
    const clients = await this.clientRepository.getAllClients();

    return clients;
  }
}
