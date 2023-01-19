import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';

import { ErrorHandler } from './errors/ErrorHandler';
import { accountRouter } from './routes/account.router';
import { clientRouter } from './routes/client.router';

import '../../containers/index';
import swaggerFile from './../../docs/swagger.json';
import { env } from '../../utils/validators/env';

export const app = express();

app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET));
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));

if (env.ENVIRONMENT !== 'test') {
  app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile));

  const limiter = rateLimit({
    windowMs: 1000 * 20,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
}

app.use('/account', accountRouter);
app.use('/client', clientRouter);
app.use(ErrorHandler);
