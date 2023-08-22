/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../menu/Menu";
import { fetchBlogs, updateLikesAPI } from "@/redux/Features/blog/blogThunk";
import FeaturedBlogSection from "../featuredBlog/FeaturedBlog";
import Loader from "../ui/loader";
import BlogCard from "../blogCard/BlogCard";
import { updateLikeCount } from "@/redux/Features/blog/blogSlice";

interface BlogPostsProps {
  authorId?: string;
  showAllBlogs?: boolean;
}

const BlogPosts = ({ authorId, showAllBlogs = false }: BlogPostsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

  useEffect(() => {
    dispatch(
      fetchBlogs(
        authorId,
        selectedCategory === "All" ? undefined : selectedCategory
      )
    );
  }, [dispatch, selectedCategory]);

  const sortedBlogsToShow = showAllBlogs
    ? blogs
    : authorId
    ? blogs
    : blogs.slice(0, 8);

  const mostLikedBlog = blogs[0];

  const handleLike = async (blogId: string) => {
    try {
      const blogToUpdate = sortedBlogsToShow.find(
        (blog) => blog._id === blogId
      );
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
      {sortedBlogsToShow.length === 0 && (
        <p className="text-center text-xl mt-8">
          <Loader />
        </p>
      )}
      <div className="min-h-screen">
        <p className="text-4xl font-semibold py-4 px-4">
          {showAllBlogs ? "All Blogs" : authorId ? "My Blogs" : "Popular Blogs"}
        </p>
        <Menu setSelectedCategory={setSelectedCategory} />
        <div className="p-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 select-none">
          {sortedBlogsToShow?.map((blog: Blog) => (
            <BlogCard key={blog?._id} blog={blog} onLike={handleLike} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
