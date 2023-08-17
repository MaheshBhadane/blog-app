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
  full_name: z.string().nonempty("Full Name is Required"),
  email: z.string().email().nonempty("Email is Required"),
  author_type: z.string().nonempty("Author Type is Required"),
  password: z.string().min(5, "Password must have at least 5 characters")
});

export type User = z.infer<typeof createUserSchema>;
