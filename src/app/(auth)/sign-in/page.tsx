"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import styles from "@/app/(auth)/sign-up/signUp.module.css";
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
import { useRouter } from "next/navigation";
import { User, loginUserSchema } from "@/app/(auth)/sign-in/helper";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";

interface Styles {
  [key: string]: string;
}

const SignIn = () => {
  const typedStyles = styles as Styles;
  const router = useRouter();
  const { toast } = useToast();
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/blog";

  const form = useForm<User>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: User) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password
      });
      console.log({ res });
      if (!res?.error) {
        router.push("/create-blog");
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "invalid email or password",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error,
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={typedStyles.form}
        >
          <h1 className={typedStyles["form-header"]}>Hello Again!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
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
            Sign In
          </Button>
          <span className="text-sm ml-2">Do not have an account?</span>
          <Link
            href="/sign-up"
            className={
              "rounded-2xl mx-1 text-sm hover:text-blue-500 cursor-pointer"
            }
          >
            Sign Up
          </Link>
        </form>
      </Form>
    </>
  );
};

export default SignIn;
