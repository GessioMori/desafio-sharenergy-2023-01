import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';

import { ErrorHandler } from './errors/ErrorHandler';

import '../../containers/index';
import { accountRouter } from './routes/account.router';

config();

export const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/account', accountRouter);
app.use(ErrorHandler);

app.use(ErrorHandler);
