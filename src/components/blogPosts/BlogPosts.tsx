"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../menu/Menu";
import { fetchBlogs } from "@/redux/Features/blog/blogThunk";

const BlogPosts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // const blogs = await fetchBlogs();

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog: Blog) => blog.category === selectedCategory);
  return (
    <>
      <div className="min-h-screen">
        <p className="text-4xl font-semibold py-4 px-4">Popular blogs</p>
        <Menu setSelectedCategory={setSelectedCategory} />
        <div className="p-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 select-none">
          {filteredBlogs?.map((blog: Blog) => (
            <>
              <div className="w-full cursor-pointer rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50">
                <Image
                  className="aspect-video bg-cover w-full rounded-t-md min-h-40"
                  src={blog?.image}
                  alt="Blog"
                  height={100}
                  width={100}
                />
                <div className="p-4">
                  <span className="text-blue-600 font-normal text-base">
                    {blog?.created_at?.toLocaleDateString()}
                  </span>
                  <p className="font-semibold text-xl py-2">{blog?.title}</p>
                  <p className="font-light text-gray-700 text-justify line-clamp-3">
                    {blog?.subtitle}
                  </p>
                  <p className="font-light text-gray-700 text-justify line-clamp-3">
                    {blog?.content}
                  </p>
                  <div className="flex flex-wrap mt-10 space-x-4 align-bottom">
                    <Image
                      className="w-10 h-10 rounded-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPdvF3u9YGCmWQZDGug3Jy2Eqrb4XuoOQbjozL6ObMiSl_2AvFQGSdpuqNPgADM37GJQ&usqp=CAU"
                      alt="user"
                      height={100}
                      width={100}
                    />
                    <div className="flex flex-col space-y-0">
                      <p className="font-semibold text-base">{blog?.author}</p>
                      <p className="font-light text-sm">{blog?.author_type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
