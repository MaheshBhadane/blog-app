"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "@/redux/Features/blog/blogThunk";
import Link from "next/link";
import { Button } from "../ui/button";

const EditorsPosts = () => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const sortedBlogs = blogs.slice().sort((a, b) => b.like_count - a.like_count);

  const editorPicks = sortedBlogs
    ?.filter((blog) => blog.is_editor_pick)
    .slice(0, 3);
  const mostLikedBlog = editorPicks[0];

  return (
    <>
      <section>
        <div
          className="h-96 col-span-4 flex items-center justify-center"
          style={{
            backgroundImage: `url(${mostLikedBlog?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "top right",
            backgroundRepeat: "no-repeat"
          }}
        >
          {" "}
          <div className="ml-20 w-100">
            <Button variant={"outline"} size={"sm"}>
              {mostLikedBlog?.category}
            </Button>
            <h2 className="text-white text-4xl font-serif pt-3">
              {mostLikedBlog?.title}{" "}
            </h2>
            <p className="text-indigo-100 mt-4 capitalize font-thin tracking-wider leading-7">
              {mostLikedBlog?.created_at?.toLocaleDateString()} -{" "}
              {mostLikedBlog?.subtitle}
            </p>
          </div>
        </div>
      </section>
      <div className="min-h-screen">
        <p className="text-4xl font-semibold py-4 px-4">Editor’s Pick</p>
        <div className="p-6 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 select-none">
          {editorPicks?.map((blog: Blog) => (
            <React.Fragment key={blog?._id}>
              <Link
                href={`/blog/${blog?._id}`}
                className="w-full cursor-pointer rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50"
              >
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
                      <p className="font-semibold text-base">
                        {blog?.author?.full_name}
                      </p>
                      <p className="font-light text-sm">
                        {blog?.author?.author_type}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default EditorsPosts;
