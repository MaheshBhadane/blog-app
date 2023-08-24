import { useForm } from "react-hook-form";
import { Blog, createBlogSchema } from "@/app/(blog)/write/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

const FormStep2: React.FC<{
  formData: Blog;
  onPrevious: () => void;
  onSubmit: () => void;
}> = ({ formData, onPrevious, onSubmit }) => {
  const { handleSubmit, setValue, formState, getValues } = useForm<Blog>({
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
      <div className="space-y-4 flex flex-col items-center">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setValue("image", res?.at(0)?.url!);
            toast({
              description: "Image Uploaded Succesfully!",
              variant: "success"
            });
          }}
          content={{ allowedContent: <>Image upto 32 MB, max 1</> }}
          onUploadError={(error: Error) => {
            toast({
              title: "Uh oh! Something went wrong.",
              description: error.message,
              variant: "destructive"
            });
          }}
        />
        {getValues("image") ? (
          <Image
            src={getValues("image")}
            alt="uploaded image"
            height={100}
            width={100}
          />
        ) : null}
        <div>
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
      </div>
    </form>
  );
};

export default FormStep2;
