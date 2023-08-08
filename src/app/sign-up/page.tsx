"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import styles from "./SignUp.module.css";
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
import { createUserSchema } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Styles {
  [key: string]: string;
}
const SignUp = () => {
  const typedStyles = styles as Styles;
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      full_name: "",
      email: "",
      author_type: "",
      password: ""
    }
  });
  return (
    <>
      <div className="h-screen md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div>
            <h1 className="font-bold text-4xl font-sans">My Blogs</h1>
            <p className="mt-1">Create Your own blogs here</p>
            <Button
              type="submit"
              className="w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
              asChild
            >
              <Link href="/blog">Read More</Link>
            </Button>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {})}
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author_type"
                render={({ field }) => (
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Sign Up
              </Button>
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                Already have an account?
              </span>{" "}
              <Link
                href="/sign-in"
                className={`rounded-2xl ${typedStyles["sign-in-button"]}`}
              >
                Sign In
              </Link>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
