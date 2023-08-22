import { createBlogSchema } from "@/app/(blog)/write/helper";
import connect from "@/lib/db";
import { Blog, IBlog } from "@/models";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// API to fetch list of all blogs or search by title
export async function GET(request: NextRequest) {
  try {
    await connect();

    const queryParams = new URLSearchParams(request.url.split("?")[1]);
    const searchQuery = queryParams.get("query");

    let query = Blog.find().populate({
      path: "author",
      select: "full_name author_type"
    });

    if (searchQuery) {
      query = query.find({
        title: { $regex: searchQuery, $options: "i" }
      });
    }

    const matchedBlogs: IBlog[] = await query;

    return NextResponse.json(matchedBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs." });
  }
}

// API to create new blog
export async function POST(req: NextRequest) {
  try {
    await connect();
    const userData = await getToken({ req });
    const requestData = createBlogSchema.safeParse(await req.json());

    if (!requestData.success) {
      const validationErrors = requestData.error.formErrors.fieldErrors;
      return new Response(JSON.stringify({ errors: validationErrors }), {
        status: 422
      });
    }

    const blogData = { ...requestData.data, author: userData?.id! };
    const createdBlog = await Blog.create(blogData);
    return NextResponse.json(createdBlog);
  } catch (error) {
    console.error("Error creating the blog post:", error);
    return NextResponse.json(
      { error: "Failed to create the blog post." },
      { status: 500 }
    );
  }
}
