import { z } from "zod";

export const createAccountSchema = z
  .object({
    username: z
      .string({ required_error: "No username received." })
      .min(5, "Username must have at least 5 characters."),
    password: z
      .string({ required_error: "No password received." })
      .min(6, "Password must have at least 6 characters."),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        message: "Passwords do not match",
        path: ["confirmPassword"],
        code: "custom",
      });
    }
  });

export type CreateAccountDataType = z.infer<typeof createAccountSchema>;
