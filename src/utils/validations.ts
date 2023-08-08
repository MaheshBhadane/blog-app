import { z } from "zod";

export const createUserSchema = z.object({
  full_name: z.string().nonempty(),
  email: z.string().email(),
  author_type: z.string().nonempty(),
  password: z.string().min(5)
});
