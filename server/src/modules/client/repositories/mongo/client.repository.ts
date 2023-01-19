import { Model } from 'mongoose';
import { CreateClientDTO } from '../../dtos/createClientDTO';
import { UpdateClientDTO } from '../../dtos/updateClientDTO';
import { IClient } from '../../models/IClient';
import { Client } from '../../models/mongo/client.model';
import { IClientRepository } from '../IClientRepository';

export class ClientRepository implements IClientRepository {
  private readonly repository: Model<IClient>;

  constructor() {
    this.repository = Client;
  }

  async createClient(data: CreateClientDTO): Promise<IClient> {
    const newClient = await this.repository.create(data);
    return newClient;
  }

  async getClientByCpf(cpf: string): Promise<IClient | null> {
    const client = await this.repository.findOne({ cpf });
    return client;
  }

  async getClientById(_id: string): Promise<IClient | null> {
    const client = await this.repository.findById(_id);
    return client;
  }

  async getClientByEmail(email: string): Promise<IClient | null> {
    const client = await this.repository.findOne({ email });
    return client;
  }

  async getClientByName(name: string): Promise<IClient[]> {
    const clients = await this.repository.find({ name });
    return clients;
  }

  async getAllClients(): Promise<IClient[]> {
    const clients = await this.repository.find({}, null, { sort: { name: 1 } });
    return clients;
  }

  async updateClient(
    _id: string,
    data: UpdateClientDTO,
  ): Promise<IClient | null> {
    const updatedClient = await this.repository.findOneAndUpdate(
      { _id },
      data,
      { new: true },
    );
    return updatedClient;
  }

  async deleteClient(_id: string): Promise<void> {
    await this.repository.findOneAndDelete({ _id });
  }
}
