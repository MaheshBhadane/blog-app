import { z } from "zod";

export const createBlogPost = async (blogData: Blog) => {
  const response = await fetch("/api/create-blog", {
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

export const createBlogSchema = z.object({
  title: z.string().min(4),
  subtitle: z.string(),
  content: z.string().min(6),
  image: z.string(),
  category: z.enum(["Nature", "Mountain", "Ocean", "Wildlife", "Forest"]),
  is_editor_pick: z.boolean(),
  author: z.string(),
  author_type: z.string()
});

export type Blog = z.infer<typeof createBlogSchema>;
