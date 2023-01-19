import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../utils/errors/AppError';
import { UpdateClientDTO } from '../dtos/updateClientDTO';
import { IClientRepository } from '../repositories/IClientRepository';
import { updateClientSchema } from '../validators/updateClient.schema';

@injectable()
export class UpdateClientService {
  constructor(
    @inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute({ id, ...data }: UpdateClientDTO & { id: string }) {
    const clientData = updateClientSchema.parse(data);

    if (clientData.email) {
      const emailAlreadyRegistered =
        await this.clientRepository.getClientByEmail(clientData.email);

      if (
        emailAlreadyRegistered !== null &&
        emailAlreadyRegistered._id.toString() !== id
      ) {
        throw new AppError('E-mail already registered.');
      }
    }

    const updatedClient = await this.clientRepository.updateClient(
      id,
      clientData,
    );

    if (updatedClient == null) {
      throw new AppError('Client not found.', 404);
    }

    return updatedClient;
  }
}
