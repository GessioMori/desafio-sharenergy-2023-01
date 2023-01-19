import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../utils/errors/AppError';
import { IClientRepository } from '../repositories/IClientRepository';

@injectable()
export class DeleteClientService {
  constructor(
    @inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute({ id }: { id: string }) {
    const client = await this.clientRepository.getClientById(id);

    if (client == null) {
      throw new AppError('Client not found.', 404);
    }

    await this.clientRepository.deleteClient(id);

    return true;
  }
}
