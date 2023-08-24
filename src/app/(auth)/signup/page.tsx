import React from "react";
import styles from "@/app/(auth)/signup/signUp.module.css";
import Link from "next/link";
import SignUpClient from "./signUpClient";

interface Styles {
  [key: string]: string;
}

const SignUp = () => {
  const typedStyles = styles as Styles;

  return (
    <>
      <div className={typedStyles.form}>
        <h1 className={typedStyles["form-header"]}>Hello!</h1>
        <p className="text-sm font-normal text-gray-600 mb-7">
          Sign Up to Get Started
        </p>
        <SignUpClient />
        <span className="text-sm ml-2">Already have an account?</span>
        <Link
          href="/login"
          className={
            "rounded-2xl mx-1 text-sm hover:text-blue-500 cursor-pointer"
          }
        >
          Sign In
        </Link>
      </div>
    </>
  );
};

export default SignUp;
