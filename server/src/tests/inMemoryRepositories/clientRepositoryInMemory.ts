import { Types } from 'mongoose';
import { CreateClientDTO } from '../../modules/client/dtos/createClientDTO';
import { UpdateClientDTO } from '../../modules/client/dtos/updateClientDTO';
import { IClient } from '../../modules/client/models/IClient';
import { IClientRepository } from '../../modules/client/repositories/IClientRepository';

export class ClientRepositoryInMemory implements IClientRepository {
  items: IClient[] = [];

  async createClient(data: CreateClientDTO): Promise<IClient> {
    const newClient: IClient = {
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    this.items.push(newClient);

    return newClient;
  }

  async getClientByCpf(cpf: string): Promise<IClient | null> {
    return this.items.find((client) => client.cpf === cpf) ?? null;
  }

  async getClientById(_id: string): Promise<IClient | null> {
    return this.items.find((client) => client._id.toString() === _id) ?? null;
  }

  async getClientByEmail(email: string): Promise<IClient | null> {
    return this.items.find((client) => client.email === email) ?? null;
  }

  async getClientByName(name: string): Promise<IClient[]> {
    return this.items.filter((client) => client.name === name);
  }

  async getAllClients(): Promise<IClient[]> {
    return this.items;
  }

  async updateClient(
    _id: string,
    data: UpdateClientDTO,
  ): Promise<IClient | null> {
    this.items = this.items.map((client) => {
      if (client._id.toString() !== _id) {
        return client;
      }
      return { ...client, ...data };
    });
    return this.items.find((client) => client._id.toString() === _id) ?? null;
  }

  async deleteClient(_id: string): Promise<void> {
    this.items = this.items.filter((client) => client._id.toString() !== _id);
  }
}
