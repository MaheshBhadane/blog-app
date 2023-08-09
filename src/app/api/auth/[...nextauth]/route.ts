import CredentialsProvider from "next-auth/providers/credentials";
import { signJwtToken } from "@/lib/jwt";
import bcrypt from "bcrypt";
import connect from "@/lib/db";
import { User } from "@/models";
import NextAuth from "next-auth/next";

const handler = NextAuth({
  pages: {
    signIn: "/sign-in",
    error: "/sign-in"
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "abc@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("hello");
        try {
          console.log("hello");
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please provide all required fields");
          }
          const { email, password } = credentials;

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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
        token.accessToken = user?.accessToken;
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
