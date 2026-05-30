import { z } from "zod";

export const getByIdSchema = z.object({
  id: z.number().int(),
});

export const updateUserSchema = z.object({
  username: z.string().min(3).max(20).optional(),
  password: z.string().min(6).max(8).optional(),
  role_id: z.number().int().optional(),
});

export const deleteUserSchema = z.object({
  id: z.number().int(),
});
