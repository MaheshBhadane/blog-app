import connect from "@/lib/db";
import { Blog, IBlog } from "@/models";
import { NextResponse } from "next/server";
connect();

export async function POST(req: Request) {
  try {
    const body: IBlog = await req.json();
    const saved = await Blog.create(body);
    return NextResponse.json(saved);
  } catch (error) {
    console.error("Error creating the blog post:", error);
    return NextResponse.json(
      { error: "Failed to create the blog post." },
      { status: 500 }
    );
  }
}
