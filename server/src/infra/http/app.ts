import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import { config } from 'dotenv';

import { ErrorHandler } from './errors/ErrorHandler';
import { accountRouter } from './routes/account.router';
import { clientRouter } from './routes/client.router';

import '../../containers/index';
import swaggerFile from './../../docs/swagger.json';

config();

export const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

if (process.env.ENVIRONMENT !== 'test') {
  app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile));
}

app.use('/account', accountRouter);
app.use('/client', clientRouter);
app.use(ErrorHandler);
