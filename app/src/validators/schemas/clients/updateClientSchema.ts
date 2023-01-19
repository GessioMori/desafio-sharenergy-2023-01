import { z } from "zod";
import { phoneRegExp } from "./utils/phoneValidator";

export const updateClientSchema = z.object({
  name: z.string().min(5, "Client name must have at least 5 characters"),
  email: z
    .string({ required_error: "No email received" })
    .email("Invalid email"),
  phoneNumber: z
    .string()
    .regex(phoneRegExp, "Invalid phone number")
    .or(z.literal(""))
    .transform((value) => (value === "" ? undefined : value)),
  address: z
    .string()
    .min(10, "Address must have at least 10 characters")
    .max(300, "Address must have at most 300 characters")
    .or(z.literal(""))
    .transform((value) => (value === "" ? undefined : value)),
});

export type UpdateClientType = z.infer<typeof updateClientSchema>;
