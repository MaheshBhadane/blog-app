import { z } from "zod";

export const createUser = async (userData: User) => {
  const response = await fetch("/api/signup", {
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

const namePattern = /^[A-Za-z\s]+$/;
const authorTypePattern = /^[A-Za-z]+$/;

export const createUserSchema = z
  .object({
    full_name: z
      .string()
      .nonempty("Full Name is Required")
      .refine((value) => namePattern.test(value), {
        message: "Invalid characters in Full Name"
      }),
    email: z.string().nonempty("Email is Required").email("Invalid Email"),
    author_type: z
      .string()
      .nonempty("Author Type is Required")
      .refine((value) => authorTypePattern.test(value), {
        message: "Invalid characters in Author Type"
      }),
    password: z
      .string()
      .nonempty("Password is Required")
      .min(5, "Password must have at least 5 characters")
  })
  .strict();

export type User = z.infer<typeof createUserSchema>;
