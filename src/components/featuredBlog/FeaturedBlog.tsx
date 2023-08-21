import React from "react";
import { Button } from "../ui/button";

interface mostLikedBlogProp {
  mostLikedBlog: Blog | null;
}

const FeaturedBlogSection = ({ mostLikedBlog }: mostLikedBlogProp) => {
  return (
    <section>
      <div
        className="h-96 col-span-4 flex items-center"
        style={{
          backgroundImage: `url(${mostLikedBlog?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="ml-20 w-100">
          <Button variant={"outline"} size={"sm"}>
            {mostLikedBlog?.category}
          </Button>
          <h2 className="text-white text-4xl font-serif pt-3">
            {mostLikedBlog?.title}
          </h2>
          {mostLikedBlog && mostLikedBlog.created_at instanceof Date && (
            <p className="text-indigo-100 mt-4 capitalize font-thin tracking-wider leading-7">
              {mostLikedBlog.created_at.toLocaleDateString()} -{" "}
              {mostLikedBlog.subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogSection;
