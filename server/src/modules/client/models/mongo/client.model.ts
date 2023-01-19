import { model, Schema } from 'mongoose';
import { IClient } from '../IClient';

const clientSchema = new Schema<IClient>(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    cpf: {
      type: String,
      require: true,
      unique: true,
    },
    phoneNumber: String,
    address: String,
  },
  { timestamps: true },
);

export const Client = model<IClient>('Client', clientSchema);
