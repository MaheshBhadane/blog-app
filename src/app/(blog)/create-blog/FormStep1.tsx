/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import Image from "next/image";
import { Blog, createBlogSchema } from "@/app/(blog)/create-blog/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CircleDot,
  ClipboardType,
  FileText,
  PenSquare,
  Subtitles,
  Type
} from "lucide-react";

const FormStep1: React.FC<{
  formData: any;
  onNext: (data: Blog) => void;
}> = ({ formData, onNext }) => {
  const form = useForm<Blog>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: formData
  });

  const onSubmit = (data: Blog) => {
    onNext(data);
  };

  const menus = [
    "Adventure",
    "Travel",
    "Fashion",
    "Technology",
    "Branding"
  ] as const;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-black text-3xl font-bold space-y-4">
          Step 1: Blog Information
        </h2>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <>
                <FormItem className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center pl-2">
                    <Type color="gray" />
                  </span>
                  <FormControl>
                    <Input
                      className="rounded-xl pl-12 py-6"
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
                <FormMessage />
              </>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <>
                <FormItem className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center pl-2">
                    <Subtitles color="gray" />
                  </span>
                  <FormControl>
                    <Input
                      className="rounded-xl pl-12 py-6"
                      placeholder="Subtitle"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
                <FormMessage />
              </>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <>
                <FormItem className="relative">
                  <span className="absolute inset-y-0 left-2 flex pt-6 pl-2">
                    <FileText color="gray" />
                  </span>
                  <FormControl>
                    <Textarea
                      className="pl-12 py-7"
                      placeholder="Content"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
                <FormMessage />
              </>
            )}
          />
          <div className="items-top flex space-x-2 gap-1.5">
            <Checkbox
              id="is_editor_pick"
              {...form.register("is_editor_pick")}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="is_editor_pick"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Is Editor's Pick
              </label>
            </div>
          </div>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <>
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-xl pl-4 py-6">
                        <span className="inset-y-0 flex items-start gap-2">
                          <CircleDot color="gray" name="Category" />
                          <SelectValue placeholder="Category" />
                        </span>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {menus.map((menu, index) => (
                          <SelectItem key={index} value={menu}>
                            {menu}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
                <FormMessage />
              </>
            )}
          />
          <Button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormStep1;
