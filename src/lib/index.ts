export const formatBlogs = (blogs: Blog[]): Blog[] => {
  return blogs.map((blog) => ({
    ...blog,
    created_at: new Date(blog.created_at)
  }));
};
