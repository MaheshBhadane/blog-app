import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5)
});

export type User = z.infer<typeof loginUserSchema>;
