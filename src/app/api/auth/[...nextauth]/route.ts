/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signJwtToken } from "@/lib/jwt";
import bcrypt from "bcrypt";
import connect from "@/lib/db";
import { User } from "@/models";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "abc@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please provide all required fields");
          }
          const { email, password } = credentials;
          console.log("hello");
          await connect();
          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            throw new Error("Invalid input");
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
          );

          if (!isPasswordValid) {
            throw new Error("Wrong Credientials!");
          }

          const accessToken = signJwtToken(
            { id: existingUser._id },
            { expiresIn: "6d" }
          );

          const user = {
            id: existingUser._id,
            email: existingUser.email,
            accessToken
          };
          return user;
        } catch (error) {
          throw new Error("Something went wrong");
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/sign-in"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user?.accessToken;
        token.id = user?.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token?.id;
        session.user.accessToken = token?.accessToken;
      }

      return session;
    }
  }
});

export { handler as GET, handler as POST };
