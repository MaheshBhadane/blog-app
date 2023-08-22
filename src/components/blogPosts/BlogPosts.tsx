"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../menu/Menu";
import { fetchBlogs } from "@/redux/Features/blog/blogThunk";
import Link from "next/link";
import { HeartIcon } from "lucide-react";
import FeaturedBlogSection from "../featuredBlog/FeaturedBlog";
import Loader from "../ui/loader";

interface BlogPostsProps {
  authorId?: string;
  showAllBlogs?: boolean;
}

const BlogPosts = ({ authorId, showAllBlogs = false }: BlogPostsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const loading = useSelector((state: RootState) => state.blog.isLoading);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

  useEffect(() => {
    dispatch(fetchBlogs(authorId));
  }, [dispatch]);

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog: Blog) => blog.category === selectedCategory);

  const sortedBlogs = filteredBlogs
    .slice()
    .sort((a, b) => b.like_count - a.like_count);

  const sortedBlogsToShow = showAllBlogs
    ? sortedBlogs
    : authorId
    ? filteredBlogs
    : sortedBlogs.slice(0, 8);

  const mostLikedBlog = sortedBlogs[0];

  return (
    <>
      <FeaturedBlogSection mostLikedBlog={mostLikedBlog} />
      {loading && (
        <p className="text-center text-xl mt-8">
          <Loader />
        </p>
      )}
      <div className="min-h-screen">
        <p className="text-4xl font-semibold py-4 px-4">
          {showAllBlogs ? "All Blogs" : authorId ? "My Blogs" : "Popular Blogs"}
        </p>
        <Menu setSelectedCategory={setSelectedCategory} />
        {sortedBlogsToShow.length === 0 && (
          <p className="text-center text-xl mt-8">No Blogs Available!</p>
        )}
        <div className="p-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 select-none">
          {sortedBlogsToShow?.map((blog: Blog) => (
            <React.Fragment key={blog?._id}>
              <div className="w-full cursor-pointer rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50">
                <Link href={`/blog/${blog?._id}`}>
                  <Image
                    className="aspect-video bg-cover w-full rounded-t-md min-h-40"
                    src={blog?.image}
                    alt="Blog"
                    height={100}
                    width={100}
                  />
                </Link>

                <div className="p-4">
                  <div className="text-blue-600 text-base flex flex-row justify-between space-y-0">
                    {blog?.created_at?.toLocaleDateString()}
                    <HeartIcon
                      className={`text-red-600 ${liked ? "fill-red-600" : ""}`}
                      onClick={handleLike}
                    />
                  </div>
                  <p className="font-semibold text-xl py-2">{blog?.title}</p>
                  <p className="font-light text-gray-700 text-justify line-clamp-3">
                    {blog?.subtitle}
                  </p>
                  <p className="font-light text-gray-700 text-justify line-clamp-3">
                    {blog?.content}
                  </p>
                  <div className="flex flex-wrap mt-10 space-x-4 align-bottom justify-between">
                    <div className="flex space-x-4 items-center">
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
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
