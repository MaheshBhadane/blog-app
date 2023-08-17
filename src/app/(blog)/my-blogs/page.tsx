"use client";
import BlogPosts from "@/components/blogPosts/BlogPosts";
import { useSession } from "next-auth/react";
import React from "react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <>
      <section>
        <div className="h-96 col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 flex items-center">
          <div className="ml-20 w-100">
            <h2 className="text-white text-4xl font-serif">
              Richird Norton photorealistic rendering as real photos{" "}
            </h2>
            <p className="text-indigo-100 mt-4 capitalize font-thin tracking-wider leading-7">
              real photos
            </p>
          </div>
        </div>
      </section>
      {session?.user ? <BlogPosts authorId={session?.user?.id} /> : null}
    </>
  );
};

export default Home;
