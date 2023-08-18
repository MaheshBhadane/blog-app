import BlogPosts from "@/components/blogPosts/BlogPosts";
import EditorsPosts from "@/components/editorsPosts/EditorsPosts";
import React from "react";

const Home = () => {
  return (
    <>
      <BlogPosts showAllBlogs={false} />
      <EditorsPosts />
    </>
  );
};

export default Home;
