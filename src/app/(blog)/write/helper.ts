import { z } from "zod";

export const createBlogPost = async (blogData: Blog) => {
  const response = await fetch("/api/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(blogData)
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result.message;
};

export const updateBlogPost = async (blogId: string, updatedData: Blog) => {
  const response = await fetch(`/api/blog/${blogId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result.message;
};

export const createBlogSchema = z.object({
  title: z.string().nonempty("Title is Required"),
  subtitle: z.string().nonempty("Subtitle is Required"),
  content: z.string().nonempty("Content is Required"),
  image: z.string(),
  category: z.enum([
    "Adventure",
    "Travel",
    "Fashion",
    "Technology",
    "Branding"
  ]),
  is_editor_pick: z.boolean(),
  like_count: z.number().optional()
});

export type Blog = z.infer<typeof createBlogSchema>;
