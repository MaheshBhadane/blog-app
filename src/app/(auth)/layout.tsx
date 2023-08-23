import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen md:flex">
      <section className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>
          <h1 className="font-bold text-4xl font-sans text-white">My Blogs</h1>
          <p className="mt-1 text-white">Create Your own blogs here</p>
          <Button
            type="submit"
            className="w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            asChild
          >
            <Link href="/">Read More</Link>
          </Button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
      </section>
      <section className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        {children}
      </section>
    </main>
  );
}
