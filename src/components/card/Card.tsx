/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Menu from "@/components/menu/Menu";

interface CardProps {
  blogs: Blog[];
  setSelectedCategory: (category: string) => void;
}

const Card = ({ blogs, setSelectedCategory }: CardProps) => {
  return (
    <>
      <div className="min-h-screen">
        <p className="text-4xl font-semibold py-4 px-4">Popular blogs</p>
        <Menu setSelectedCategory={setSelectedCategory} />
        <div className="p-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 select-none">
          {blogs?.map((blog: Blog) => (
            <>
              <div className="w-full cursor-pointer rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50">
                <img
                  className="aspect-video bg-cover w-full rounded-t-md min-h-40"
                  src={blog?.image}
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
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPdvF3u9YGCmWQZDGug3Jy2Eqrb4XuoOQbjozL6ObMiSl_2AvFQGSdpuqNPgADM37GJQ&usqp=CAU"
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

export default Card;
