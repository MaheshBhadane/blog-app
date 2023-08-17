export const fetchBlogs = async (authorId?: string): Promise<Blog[]> => {
  let url = "/api/blog";
  if (authorId) {
    url = `/api/blog?author=${authorId}`;
  }

  const data = await fetch(url);
  const posts = await data.json();

  return posts;
};
