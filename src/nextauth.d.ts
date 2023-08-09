/* eslint-disable no-unused-vars */
import { DefaultSession, DefaultUser } from "next-auth";
export enum Role {
  user = "user",
  admin = "admin"
}
interface IUser extends DefaultUser {
  accessToken: string;
}
declare module "next-auth" {
  interface User extends IUser {
    id: string;
    accessToken: string;
  }
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
