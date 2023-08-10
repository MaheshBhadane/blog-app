import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connect from "@/lib/db";
import { User } from "@/models";
import NextAuth from "next-auth/next";

const handler = NextAuth({
  pages: {
    signIn: "/sign-in"
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        try {
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

          const user = {
            id: existingUser._id,
            name: existingUser.full_name,
            email: existingUser.email
          };
          return user;
        } catch (error) {
          throw new Error("Something went wrong");
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token?.id;
      }

      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
