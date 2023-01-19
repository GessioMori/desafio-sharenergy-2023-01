import { Types } from 'mongoose';

export interface IClient {
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
}
