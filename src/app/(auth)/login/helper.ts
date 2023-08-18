import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email("Email is required").nonempty("Email is required"),
  password: z
    .string()
    .min(5, "Password must have at least 5 characters")
    .nonempty("Password is required")
});

export type User = z.infer<typeof loginUserSchema>;
