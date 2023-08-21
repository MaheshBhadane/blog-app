"use client";
import React, { useState } from "react";
import { Blog, createBlogPost } from "@/app/(blog)/write/helper";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import BlogForm from "@/components/blogForm/BlogForm";

const CreateBlog = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<Blog>({
    title: "",
    subtitle: "",
    content: "",
    category: "Adventure",
    is_editor_pick: false,
    image: ""
  });
  const { toast } = useToast();
  const router = useRouter();
  const handleNext = (data: Blog) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = async (data: Blog) => {
    try {
      await createBlogPost(data);
      toast({
        description: "Blog Created Successfully!",
        variant: "success"
      });
      router.replace("/blog");
      return;
    } catch (error) {
      let message = "";
      if (error instanceof Error) message = error.message;
      toast({
        title: "Uh oh! Something went wrong.",
        description: message,
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <section>
        <div className="h-96 col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 flex items-center justify-center">
          <div className="ml-20 w-80">
            <h2 className="text-white text-4xl font-serif">Create New Blog</h2>
          </div>
        </div>
      </section>
      <BlogForm
        step={step}
        formData={formData}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default CreateBlog;
