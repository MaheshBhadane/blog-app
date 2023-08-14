"use client";
import TabsDemo from "@/components/tabs/Tabs";
import React from "react";

const CreateBlog = () => {
  return (
    <>
      <section>
        <div className="h-96 col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 flex items-center justify-center">
          <div className="ml-20 w-80">
            <h2 className="text-white text-4xl font-serif">Create New Blog</h2>
          </div>
        </div>
      </section>
      <TabsDemo />
    </>
  );
};

export default CreateBlog;
