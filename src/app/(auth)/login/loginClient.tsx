"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { User, loginUserSchema } from "@/app/(auth)/login/helper";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const LoginClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/write";

  const form = useForm<User>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: User) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password
      });
      if (res?.error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "invalid email or password",
          variant: "destructive"
        });
        return;
      }
      toast({
        description: "User Logged In Succesfully!",
        variant: "success"
      });
      router.replace(callbackUrl);
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      autoComplete="current-password"
                      type="password"
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
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>{" "}
        </form>
      </Form>
    </>
  );
};

export default LoginClient;
