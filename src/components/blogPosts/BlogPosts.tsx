"use client";
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import Menu from "@/components/menu/Menu";
import { fetchBlogs } from "@/redux/Features/blog/blogThunk";
import FeaturedBlogSection from "@/components/featuredBlog/FeaturedBlog";
import BlogCard from "@/components/blogCard/BlogCard";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Pagination from "@/components/pagination/Pagination";

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
        limit: 12
      })
    );
  }, [dispatch, selectedCategory, currentPage]);

  const sortedBlogsToShow = showAllBlogs
    ? blogs
    : authorId
    ? blogs
    : blogs.slice(0, 8);

  const mostLikedBlog = blogs[0];

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(count / 10);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
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
              <Link href={"/blog"}>View All...</Link>
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
            <BlogCard key={blog?._id} blog={blog} data={sortedBlogsToShow} />
          ))}
        </div>
      </div>
      {pathname !== "/" && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          paginate={paginate}
        />
      )}
    </>
  );
};

export default BlogPosts;
