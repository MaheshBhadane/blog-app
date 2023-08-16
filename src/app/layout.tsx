import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "@/SessionProvider";
import { Providers } from "@/redux/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog ",
  description: "Created by Mahesh Bhadane"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Providers>{children}</Providers>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
