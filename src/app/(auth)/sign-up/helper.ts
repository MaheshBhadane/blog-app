import { z } from "zod";

export const createUser = async (userData: User) => {
  const response = await fetch("/api/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result.message;
};

export const createUserSchema = z.object({
  full_name: z.string().nonempty(),
  email: z.string().email(),
  author_type: z.string().nonempty(),
  password: z.string().min(5)
});

export type User = z.infer<typeof createUserSchema>;
