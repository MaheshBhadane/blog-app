"use client";
import BlogPosts from "@/components/blogPosts/BlogPosts";
import { useSession } from "next-auth/react";
import React from "react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <>{session?.user ? <BlogPosts authorId={session?.user?.id} /> : null}</>
  );
};

export default Home;
