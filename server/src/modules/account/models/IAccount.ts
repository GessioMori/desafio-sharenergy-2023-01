import { Types } from 'mongoose';

export interface IAccount {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
}
