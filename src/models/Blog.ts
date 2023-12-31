import mongoose, { Schema, Document, Model, model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  category: string;
  is_editor_pick: boolean;
  like_count: number;
  created_at: Date;
  updated_at: Date;
  author: string;
}

const BlogSchema: Schema = new mongoose.Schema(
  {
    title: { type: String, required: true, min: 4 },
    subtitle: { type: String, required: true },
    content: { type: String, required: true, min: 6 },
    image: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Adventure", "Travel", "Fashion", "Technology", "Branding"]
    },
    is_editor_pick: { type: Boolean, default: false },
    like_count: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const Blog = (mongoose.models.Blog ||
  model<IBlog>("Blog", BlogSchema)) as Model<IBlog>;
