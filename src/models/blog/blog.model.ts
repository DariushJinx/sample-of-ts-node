import { Schema, model } from "mongoose";
import { IBlog } from "../../types/blog.types";
const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);
export const BlogModel = model<IBlog>("blog", BlogSchema);
