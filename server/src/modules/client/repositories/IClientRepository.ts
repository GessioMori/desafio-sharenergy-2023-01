import { CreateClientDTO } from '../dtos/createClientDTO';
import { UpdateClientDTO } from '../dtos/updateClientDTO';
import { IClient } from '../models/IClient';

export interface IClientRepository {
  createClient: (data: CreateClientDTO) => Promise<IClient>;
  getClientByCpf: (cpf: string) => Promise<IClient | null>;
  getClientById: (_id: string) => Promise<IClient | null>;
  getClientByEmail: (email: string) => Promise<IClient | null>;
  getClientByName: (name: string) => Promise<IClient[]>;
  getAllClients: () => Promise<IClient[]>;
  updateClient: (_id: string, data: UpdateClientDTO) => Promise<IClient | null>;
  deleteClient: (_id: string) => Promise<void>;
}
