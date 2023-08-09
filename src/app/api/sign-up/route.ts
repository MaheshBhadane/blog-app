import { createUserSchema } from "@/app/(auth)/sign-up/helper";
import connect from "@/lib/db";
import { User } from "@/models";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const requestData = createUserSchema.safeParse(await req.json());

    if (!requestData.success) {
      const validationErrors = requestData.error.formErrors.fieldErrors;
      return new Response(JSON.stringify({ errors: validationErrors }), {
        status: 422
      });
    }

    const { full_name, email, author_type, password } = requestData.data;

    const isExisting = await User.findOne({ email });

    if (isExisting) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      full_name,
      email,
      author_type,
      password: hashedPassword
    });

    console.log("User created:", newUser);

    return new Response(
      JSON.stringify({ message: "User Created Successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error while creating user" }),
      {
        status: 500
      }
    );
  }
}
