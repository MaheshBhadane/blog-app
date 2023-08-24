"use client";
import React, { useEffect } from "react";
import { RootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "@/redux/Features/blog/blogThunk";
import FeaturedBlogSection from "@/components/featuredBlog/FeaturedBlog";
import BlogCard from "@/components/blogCard/BlogCard";

const EditorsPosts = () => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

  useEffect(() => {
    dispatch(fetchBlogs({}));
  }, [dispatch]);

  const editorPicks = blogs?.filter((blog) => blog.is_editor_pick).slice(0, 3);
  const mostLikedBlog = editorPicks[0];

  return (
    <>
      <FeaturedBlogSection mostLikedBlog={mostLikedBlog} />
      <div className="min-h-screen">
        <p className="text-4xl font-semibold py-4 px-4">Editor’s Pick</p>
        {editorPicks.length === 0 && (
          <p className="text-center text-xl mt-8">
            No Editor’s Pick Available!
          </p>
        )}
        <div className="p-6 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 select-none">
          {editorPicks?.map((blog: Blog) => (
            <BlogCard key={blog?._id} blog={blog} data={editorPicks} />
          ))}
        </div>
      </div>
    </>
  );
};

export default EditorsPosts;
