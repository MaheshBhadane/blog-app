import connect from "@/lib/db";
import { Blog, IBlog } from "@/models";
import { NextResponse } from "next/server";

// API to fetch list of blogs by author or all blogs
export async function GET(req: Request) {
  try {
    await connect();

    const url = new URL(req.url);
    const author = url.searchParams.get("author") as string;

    if (author) {
      const blogs: IBlog[] = await Blog.find({ author });
      return NextResponse.json(blogs);
    } else {
      const allBlogs: IBlog[] = await Blog.find(); // Fetch all blogs
      return NextResponse.json(allBlogs);
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs." });
  }
}

// API to update a blog
export async function PUT(req: Request) {
  try {
    await connect();

    const body: IBlog = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: "Missing blog ID." }, { status: 400 });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(_id, updateData, {
      new: true
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating the blog:", error);
    return NextResponse.json(
      { error: "Failed to update the blog." },
      { status: 500 }
    );
  }
}
