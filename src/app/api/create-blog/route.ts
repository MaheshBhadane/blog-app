import connect from "@/lib/db";
import { Blog, IBlog } from "@/models";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// API to create new blog
export async function POST(req: Request) {
  try {
    await connect();
    //@ts-expect-error
    const userData = await getToken({ req });
    console.log(userData);
    const body: IBlog = await req.json();
    //@ts-expect-error
    body.author = userData.id;
    const createdBlog = await Blog.create(body);
    return NextResponse.json(createdBlog);
  } catch (error) {
    console.error("Error creating the blog post:", error);
    return NextResponse.json(
      { error: "Failed to create the blog post." },
      { status: 500 }
    );
  }
}
