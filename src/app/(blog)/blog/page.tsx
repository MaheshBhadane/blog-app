import BlogPosts from "@/components/blogPosts/BlogPosts";
import React from "react";

const Blogs = () => {
  return (
    <>
      <section>
        <div className="h-96 col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 flex items-center">
          <div className="ml-20 w-100">
            <h2 className="text-white text-4xl font-serif">
              Richird Norton photorealistic rendering as real photos{" "}
            </h2>
            <p className="text-indigo-100 mt-4 capitalize font-thin tracking-wider leading-7">
              real photos
            </p>
          </div>
        </div>
      </section>
      <BlogPosts showAllBlogs={true} />
    </>
  );
};

export default Blogs;
