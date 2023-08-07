import connect from "@/lib/db";
import React from "react";

const Blog = async () => {
  await connect();

  return <div>Blog</div>;
};

export default Blog;
