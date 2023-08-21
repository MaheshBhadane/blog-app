"use client";
import { Menu, PencilLine } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose
} from "../ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "../ui/input";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { authorNavLinks, readerNavLinks } from "./helper";

const Navbar = () => {
  const { data: session } = useSession();

  const pathname = usePathname();
  const router = useRouter();
  const navLinks = session?.user ? authorNavLinks : readerNavLinks;
  const shouldShowSearchInput = !(
    pathname === "/write" ||
    pathname.startsWith("/blog/") ||
    (pathname.startsWith("/blog/") && pathname.endsWith("/edit"))
  );
  return (
    <nav className="py-6 md:py-6 flex justify-between items-center container">
      <Link href="/" className="text-xl font-bold flex items-center">
        <Image
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8"
          alt="Logo"
          height="100"
          width="100"
        />
        RUNO
      </Link>
      {shouldShowSearchInput && (
        <Input
          type="text"
          id="search-navbar"
          className=" hidden md:!block max-w-md p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
        />
      )}
      <div className="gap-10 hidden md:!flex items-center">
        {navLinks.map((link, index: number) =>
          link?.isButton ? (
            <Button className="rounded-full bg-blue-700" asChild key={index}>
              <Link href="/write">
                <PencilLine className="mr-2 h-5 w-5" /> Write
              </Link>
            </Button>
          ) : (
            <Link
              className={`${
                pathname === link.url
                  ? "font-semibold underline underline-offset-8"
                  : "hover:underline hover:underline-offset-8"
              }`}
              key={index}
              href={link.url}
            >
              {link.name}
            </Link>
          )
        )}
        {session?.user ? (
          <Button
            className="rounded-full bg-blue-700 px-8 py-4"
            onClick={() => {
              router.push("/");
              signOut({ redirect: false });
            }}
          >
            Sign out
          </Button>
        ) : (
          <></>
        )}
      </div>

      {/* mobile nav */}
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent className="w-screen min-h-full" side={"bottom"}>
          <SheetHeader>
            <SheetTitle className="font-bold text-xl font-heading ">
              RUNO
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="py-10">
            <Input
              type="text"
              id="search-mobile"
              className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
            <ul className="flex flex-col items-center justify-center gap-12">
              {navLinks.map((link, index: number) =>
                link?.isButton ? (
                  <SheetClose key={index} asChild>
                    <Button
                      className="rounded-full bg-blue-700"
                      asChild
                      key={index}
                    >
                      <Link href="/write">
                        <PencilLine className="mr-2 h-5 w-5" /> Write
                      </Link>
                    </Button>
                  </SheetClose>
                ) : (
                  <SheetClose key={index} asChild>
                    <Link
                      className="font-semibold text-xl"
                      key={index}
                      href={link.url}
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                )
              )}
              {session?.user ? (
                <SheetClose asChild>
                  <Button
                    className="rounded-full bg-blue-700"
                    onClick={() => {
                      router.push("/");
                      signOut({ redirect: false });
                    }}
                  >
                    Sign out
                  </Button>
                </SheetClose>
              ) : (
                <></>
              )}
            </ul>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
