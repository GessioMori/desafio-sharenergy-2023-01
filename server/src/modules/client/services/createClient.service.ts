import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../utils/errors/AppError';
import { CreateClientDTO } from '../dtos/createClientDTO';
import { IClientRepository } from '../repositories/IClientRepository';
import { createClientSchema } from '../validators/createClient.schema';

@injectable()
export class CreateClientService {
  constructor(
    @inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(data: CreateClientDTO) {
    createClientSchema.parse(data);

    const { cpf, email } = data;

    const cpfAlreadyRegistered = await this.clientRepository.getClientByCpf(
      cpf,
    );

    if (cpfAlreadyRegistered != null) {
      throw new AppError('CPF already registered.');
    }

    const emailAlreadyRegistered = await this.clientRepository.getClientByEmail(
      email,
    );

    if (emailAlreadyRegistered !== null) {
      throw new AppError('E-mail already registered.');
    }

    const newClient = await this.clientRepository.createClient(data);

    return newClient;
  }
}
