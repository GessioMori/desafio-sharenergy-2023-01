import { z } from 'zod';
import { phoneRegExp } from './utils/phoneRegExp';

export const updateClientSchema = z
  .object({
    name: z
      .string({ required_error: 'No client name received.' })
      .min(5, 'Client name must have at least 5 characters.')
      .optional(),
    email: z
      .string({ required_error: 'No email received.' })
      .email('Invalid email')
      .optional(),
    phoneNumber: z
      .string()
      .regex(phoneRegExp, 'Invalid phone number')
      .optional(),
    address: z
      .string()
      .min(10, 'Address must have at least 10 characters.')
      .max(300, 'Address must have at most 300 characters.')
      .optional(),
  })
  .strict();
