"use client";
import Card from "@/components/card/Card";
import { fetchBlogs } from "@/redux/Features/blog/blogThunk";
import { RootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog: Blog) => blog.category === selectedCategory);

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
      <Card blogs={filteredBlogs} setSelectedCategory={setSelectedCategory} />
    </>
  );
};

export default Home;
