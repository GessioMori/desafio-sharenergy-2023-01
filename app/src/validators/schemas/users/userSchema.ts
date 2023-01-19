import { z } from "zod";

export const userSchema = z.object({
  name: z.object({
    title: z.string(),
    first: z.string(),
    last: z.string(),
  }),
  email: z.string(),
  picture: z.object({
    medium: z.string(),
  }),
  login: z.object({
    username: z.string(),
    uuid: z.string(),
  }),
  dob: z.object({
    age: z.number(),
  }),
});

export const userResponseSchama = z.object({
  results: z.array(userSchema),
  info: z.object({
    seed: z.string(),
    results: z.number(),
    page: z.number(),
  }),
});

export type UserType = z.infer<typeof userSchema>;
export type UserResponseType = z.infer<typeof userResponseSchama>;
