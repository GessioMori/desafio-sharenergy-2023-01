import { z } from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object({
  ENVIRONMENT: z.enum(['development', 'test', 'production']),
  PORT: z.string(),
  COOKIE_SECRET: z.string(),
  CLIENT_URL: z.string(),
  MONGO_PROD_URI: z.string(),
  MONGO_TEST_URI: z.string(),
  MONGO_DEV_URI: z.string(),
});

export const env = envSchema.parse(process.env);
