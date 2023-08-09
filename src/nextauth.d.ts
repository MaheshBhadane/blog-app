/* eslint-disable no-unused-vars */
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: User;
  }
}
