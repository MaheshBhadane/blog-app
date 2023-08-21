/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import FeaturedBlogSection from "@/components/featuredBlog/FeaturedBlog";
import Loader from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import { fetchBlogById } from "@/redux/Features/blog/blogThunk";
import { RootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page({ params }: { params: { id: string } }) {
  const currentBlog = useSelector((state: RootState) => state.blog.currentBlog);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

  useEffect(() => {
    dispatch(fetchBlogById(params?.id));
  }, [dispatch]);

  return (
    <>
      <FeaturedBlogSection mostLikedBlog={currentBlog} />
      <div className="flex items-center justify-center py-20">
        {currentBlog ? (
          <div>
            <h1 className="text-2xl font-bold flex items-center justify-center ">
              {currentBlog?.title}
            </h1>
            <h2 className="text-xl text-orange-400 font-bold flex items-center justify-center">{`"${currentBlog?.subtitle}"`}</h2>

            <p>{currentBlog?.content}</p>

            <Separator className="mt-10" />
            <div className="flex flex-wrap mt-10 space-x-4 align-bottom justify-center">
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
                    {currentBlog?.author?.full_name}
                  </p>
                  <p className="font-light text-sm">
                    {currentBlog?.author?.author_type}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>
            <Loader />
          </p>
        )}
      </div>
    </>
  );
}
