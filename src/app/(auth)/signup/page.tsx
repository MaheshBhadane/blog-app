"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import styles from "@/app/(auth)/signup/signUp.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { User, createUser, createUserSchema } from "./helper";
import { useToast } from "@/components/ui/use-toast";

interface Styles {
  [key: string]: string;
}

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const typedStyles = styles as Styles;
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/write";

  const form = useForm<User>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      full_name: "",
      email: "",
      author_type: "",
      password: ""
    }
  });

  const onSubmit = async (data: User) => {
    try {
      setIsLoading(true);
      const userData = await createUser(data);
      toast({
        description: userData,
        variant: "success"
      });
      router.replace(callbackUrl);
      return;
    } catch (error) {
      let message = "";
      if (error instanceof Error) message = error.message;
      toast({
        title: "Uh oh! Something went wrong.",
        description: message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={typedStyles.form}
        >
          <h1 className={typedStyles["form-header"]}>Hello!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            Sign Up to Get Started
          </p>
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <>
                <FormItem className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center pl-2">
                    <Image
                      src={"/person.svg"}
                      height={25}
                      width={25}
                      alt="person"
                    />
                  </span>
                  <FormControl>
                    <Input
                      className="rounded-full pl-12 py-7"
                      placeholder="Full Name"
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
            name="email"
            render={({ field }) => (
              <>
                <FormItem className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center pl-2">
                    <Image
                      src={"/email.svg"}
                      height={25}
                      width={25}
                      alt="email"
                    />
                  </span>
                  <FormControl>
                    <Input
                      className="rounded-full pl-12 py-7"
                      placeholder="Email Address"
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
            name="author_type"
            render={({ field }) => (
              <>
                <FormItem className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center pl-2">
                    <Image
                      src={"/author.svg"}
                      height={25}
                      width={25}
                      alt="author"
                    />
                  </span>
                  <FormControl>
                    <Input
                      className="rounded-full pl-12 py-7"
                      placeholder="Author Type"
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
            name="password"
            render={({ field }) => (
              <>
                <FormItem className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center pl-2">
                    <Image
                      src={"/pass.svg"}
                      height={25}
                      width={25}
                      alt="password"
                    />
                  </span>
                  <FormControl>
                    <Input
                      className="rounded-full pl-12 py-7"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
                <FormMessage />
              </>
            )}
          />
          <Button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
          <span className="text-sm ml-2">Already have an account?</span>
          <Link
            href="/login"
            className={
              "rounded-2xl mx-1 text-sm hover:text-blue-500 cursor-pointer"
            }
          >
            Sign In
          </Link>
        </form>
      </Form>
    </>
  );
};

export default SignUp;
