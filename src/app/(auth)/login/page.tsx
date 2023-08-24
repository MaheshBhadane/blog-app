import React from "react";
import styles from "@/app/(auth)/signup/signUp.module.css";
import Link from "next/link";
import LoginClient from "./loginClient";

interface Styles {
  [key: string]: string;
}

const SignIn = () => {
  const typedStyles = styles as Styles;

  return (
    <>
      <div className={typedStyles.form}>
        <h1 className={typedStyles["form-header"]}>Hello Again!</h1>
        <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
        <LoginClient />
        <span className="text-sm ml-2">Do not have an account?</span>
        <Link
          href="/signup"
          className={
            "rounded-2xl mx-1 text-sm hover:text-blue-500 cursor-pointer"
          }
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignIn;
