/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import FeaturedBlogSection from "@/components/featuredBlog/FeaturedBlog";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { fetchBlogById } from "@/redux/Features/blog/blogThunk";
import { RootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page({ params }: { params: { id: string } }) {
  const { data: session } = useSession();

  const router = useRouter();
  const { toast } = useToast();

  const [deletionStatus, setDeletionStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const currentBlog = useSelector((state: RootState) => state.blog.currentBlog);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

  useEffect(() => {
    dispatch(fetchBlogById(params?.id));
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      setDeletionStatus("pending");
      const response = await fetch(`/api/blog/${params.id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setDeletionStatus("success");
        toast({
          description: "Blog Deleted Successfully!",
          variant: "success"
        });
        router.back();
      } else {
        setDeletionStatus("error");
      }
    } catch (error) {
      let message = "";
      if (error instanceof Error) message = error.message;
      toast({
        title: "Uh oh! Something went wrong.",
        description: message,
        variant: "destructive"
      });
      setDeletionStatus("error");
    }
  };

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
            <div>
              {session?.user ? (
                <div className="flex flex-row justify-between">
                  <Button
                    onClick={handleDelete}
                    disabled={deletionStatus === "pending"}
                  >
                    {deletionStatus === "pending"
                      ? "Deleting..."
                      : "Delete Blog"}
                  </Button>
                  <Button asChild>
                    <Link href={"/blog/write"}>Update Blog</Link>
                  </Button>
                </div>
              ) : (
                <></>
              )}
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
