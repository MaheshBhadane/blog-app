/* eslint-disable camelcase */
/* eslint-disable no-console */
import connect from "@/lib/db";
import { User } from "@/models";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // connect to db
    await connect();

    const { full_name, email, author_type, password } = await req.json();

    const isExisting = await User.findOne({ email });

    // Validate required fields
    if (!full_name || !email || !author_type || !password) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

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

    console.log(newUser);

    return new Response(
      JSON.stringify({ message: "User Created Successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating user" }), {
      status: 500
    });
  }
}
