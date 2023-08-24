import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().nonempty("Email is Required").email("Invalid Email"),
  password: z
    .string()
    .nonempty("Password is Required")
    .min(5, "Password must have at least 5 characters")
});

export type User = z.infer<typeof loginUserSchema>;
