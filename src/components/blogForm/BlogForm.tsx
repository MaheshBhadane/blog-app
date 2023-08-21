import FormStep1 from "@/app/(blog)/write/FormStep1";
import FormStep2 from "@/app/(blog)/write/FormStep2";

const BlogForm = ({
  step,
  formData,
  handleNext,
  handlePrevious,
  handleFormSubmit
}: any) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-10">
      {step === 1 && <FormStep1 formData={formData} onNext={handleNext} />}
      {step === 2 && (
        <FormStep2
          formData={formData}
          onPrevious={handlePrevious}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default BlogForm;
