import { Schema, model } from 'mongoose';
import { IAccount } from '../IAccount';

const accountSchema = new Schema<IAccount>(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

export const Account = model<IAccount>('Account', accountSchema);
