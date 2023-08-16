/* eslint-disable no-unused-vars */
import { useForm, Controller } from "react-hook-form";
import { Blog, createBlogSchema } from "@/app/(blog)/create-blog/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";

const FormStep2: React.FC<{
  formData: any;
  onPrevious: () => void;
  onSubmit: (data: Blog) => void;
}> = ({ formData, onPrevious, onSubmit }) => {
  const { handleSubmit, setValue, formState } = useForm<Blog>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: formData
  });

  const { isSubmitting } = formState;

  const handlePrevious = () => {
    onPrevious();
  };

  const { toast } = useToast();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-black text-3xl font-bold pb-4">
        Step 2: Upload Image
      </h2>
      <div className="space-y-4">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setValue("image", res?.at(0)?.url!);
          }}
          onUploadError={(error: Error) => {
            toast({
              title: "Uh oh! Something went wrong.",
              description: error.message,
              variant: "destructive"
            });
          }}
        />

        <Button
          type="button"
          onClick={handlePrevious}
          className="mr-2 bg-gray-400 text-white px-4 py-2"
        >
          Previous
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default FormStep2;
