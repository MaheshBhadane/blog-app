import connect from "@/lib/db";
import { Blog, IBlog } from "@/models";
import { NextResponse } from "next/server";

// API to create new blog
export async function POST(req: Request) {
  try {
    await connect();

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

//API to fetch list of all blogs posted by author
export async function GET(req: Request) {
  try {
    await connect();

    const url = new URL(req.url);
    const author = url.searchParams.get("author") as string;

    if (!author) {
      return NextResponse.json({ error: "Author parameter is missing." });
    }

    const blogs: IBlog[] = await Blog.find({ author });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs by author:", error);
    return NextResponse.json({ error: "Failed to fetch blogs by author." });
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
