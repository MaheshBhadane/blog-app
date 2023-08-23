/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../menu/Menu";
import { fetchBlogs, updateLikesAPI } from "@/redux/Features/blog/blogThunk";
import FeaturedBlogSection from "../featuredBlog/FeaturedBlog";
import BlogCard from "../blogCard/BlogCard";
import { updateLikeCount } from "@/redux/Features/blog/blogSlice";
import Loader from "../ui/loader";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BlogPostsProps {
  authorId?: string;
  showAllBlogs?: boolean;
}

const BlogPosts = ({ authorId, showAllBlogs = false }: BlogPostsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const { blogs, isLoading, count } = useSelector(
    (state: RootState) => state.blog
  );
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(
      fetchBlogs({
        authorId: authorId,
        category: selectedCategory === "All" ? undefined : selectedCategory,
        page: currentPage,
        limit: 10
      })
    );
  }, [dispatch, selectedCategory, currentPage]);

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

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(count / 10);
    if (currentPage <= totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <FeaturedBlogSection mostLikedBlog={mostLikedBlog} />

      {!isLoading && !sortedBlogsToShow.length && (
        <p className="text-center text-xl mt-8">No Blogs Available!</p>
      )}
      <div className="min-h-screen">
        <p className="text-4xl font-semibold py-4 px-4">
          {showAllBlogs ? "All Blogs" : authorId ? "My Blogs" : "Popular Blogs"}
        </p>
        <div className="flex flex-row items-center justify-between pr-10">
          <Menu setSelectedCategory={setSelectedCategory} />
          {pathname === "/" && (
            <Button asChild>
              <Link href={"/blog"}>View All Blogs...</Link>
            </Button>
          )}
        </div>
        {isLoading && (
          <p className="text-center text-xl mt-8">
            <Loader />
          </p>
        )}
        <div className="p-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 select-none">
          {sortedBlogsToShow?.map((blog: Blog) => (
            <BlogCard key={blog?._id} blog={blog} onLike={handleLike} />
          ))}
        </div>
      </div>
      {sortedBlogsToShow?.length > 8 && (
        <div className="flex justify-center mt-4">
          <nav className="bg-white px-4 py-3 rounded-lg shadow-md">
            <ul className="flex gap-2">
              <li>
                <Button
                  variant="outline"
                  className="text-indigo-500"
                  onClick={handlePreviousPage}
                >
                  Previous
                </Button>
              </li>
              {Array.from({ length: Math.ceil(count / 10) }, (_, index) => (
                <li key={index}>
                  <Button
                    variant={`${
                      currentPage === index + 1 ? "default" : "outline"
                    }`}
                    className={`text-indigo-500 ${
                      currentPage === index + 1 ? "font-semibold" : ""
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Button>
                </li>
              ))}
              <li>
                <Button
                  variant="outline"
                  className="text-indigo-500"
                  onClick={handleNextPage}
                >
                  Next
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default BlogPosts;
