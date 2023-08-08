import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="text-3xl font-bold underline">Home</div>
      <Button asChild>
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    </>
  );
};

export default Home;
