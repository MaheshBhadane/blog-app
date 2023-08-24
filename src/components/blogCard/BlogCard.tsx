import React from "react";
import Image from "next/image";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { updateLikeCount } from "@/redux/Features/blog/blogSlice";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { updateLikesAPI } from "@/redux/Features/blog/blogThunk";

interface BlogCardProps {
  blog: Blog;
  data: Blog[];
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, data }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

  const handleLike = async (blogId: string) => {
    try {
      const blogToUpdate = data.find((blog) => blog._id === blogId);
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

          <span className="flex flex-row">
            <HeartIcon
              className={`text-red-400 ${
                blog?.like_count ? "fill-red-400" : ""
              }`}
              onClick={() => handleLike(blog?._id)}
            />
            {blog?.like_count ? blog?.like_count : null}
          </span>
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
              <p className="font-light text-sm">{blog?.author?.author_type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
