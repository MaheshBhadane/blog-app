"use client";
import React, { useEffect } from "react";
import { RootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, updateLikesAPI } from "@/redux/Features/blog/blogThunk";
import FeaturedBlogSection from "../featuredBlog/FeaturedBlog";
import BlogCard from "../blogCard/BlogCard";
import { updateLikeCount } from "@/redux/Features/blog/blogSlice";

const EditorsPosts = () => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

  useEffect(() => {
    dispatch(fetchBlogs({}));
  }, [dispatch]);

  const editorPicks = blogs?.filter((blog) => blog.is_editor_pick).slice(0, 3);
  const mostLikedBlog = editorPicks[0];

  const handleLike = async (blogId: string) => {
    try {
      const blogToUpdate = editorPicks.find((blog) => blog._id === blogId);
      const updatedData = {
        ...blogToUpdate,
        like_count: blogToUpdate?.like_count! + 1
      };
      //@ts-expect-error
      await updateLikesAPI(blogId, updatedData);
      dispatch(updateLikeCount(blogId));
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

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
            <BlogCard key={blog?._id} blog={blog} onLike={handleLike} />
          ))}
        </div>
      </div>
    </>
  );
};

export default EditorsPosts;
