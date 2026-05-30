import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(8),
  role_id: z.number().int(),
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .transform((val) => val.toLowerCase()),
  password: z.string().min(6).max(8),
});
