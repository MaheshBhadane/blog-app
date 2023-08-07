import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  full_name: string;
  email: string;
  password: string;
  author_type: string;
  created_at: Date;
  updated_at: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    author_type: {
      type: String,
      required: false
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
