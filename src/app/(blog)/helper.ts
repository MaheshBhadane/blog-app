export const fetchBlogs = async (): Promise<Blog[]> => {
  const data = await fetch("/api/blog");
  const posts = await data.json();

  return posts;
};
