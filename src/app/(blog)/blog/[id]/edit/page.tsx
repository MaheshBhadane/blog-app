"use client";
import React, { useState } from "react";
import { Blog, updateBlogPost } from "@/app/(blog)/write/helper";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import BlogForm from "@/components/blogForm/BlogForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const UpdateBlog = ({ params }: { params: { id: string } }) => {
  const currentBlog = useSelector((state: RootState) => state.blog.currentBlog);
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    title: currentBlog?.title,
    subtitle: currentBlog?.subtitle,
    content: currentBlog?.content,
    category: currentBlog?.category,
    is_editor_pick: currentBlog?.is_editor_pick,
    image: currentBlog?.image
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
      await updateBlogPost(params?.id, data);
      toast({
        description: "Blog Updated Successfully!",
        variant: "success"
      });
      router.replace("/");
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
            <h2 className="text-white text-4xl font-serif">Update Blog</h2>
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

export default UpdateBlog;
