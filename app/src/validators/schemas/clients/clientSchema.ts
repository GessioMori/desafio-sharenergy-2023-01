import { z } from "zod";

export const clientSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  cpf: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const getClientsSchema = z.array(clientSchema);

export type ClientType = z.infer<typeof clientSchema>;
