import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string({ required_error: 'No username received.' }),
  password: z.string({ required_error: 'No password received.' }),
});
