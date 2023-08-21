import { createBlogSchema } from "@/app/(blog)/write/helper";
import connect from "@/lib/db";
import { Blog, IBlog } from "@/models";
import { NextResponse } from "next/server";

// API to fetch a specific blog by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log({ params });
  try {
    await connect();
    const blogId = params?.id;
    console.log({ blogId });
    const blog: IBlog | null = await Blog.findById(blogId).populate({
      path: "author",
      select: "full_name author_type"
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found." });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog." });
  }
}

// API to update a specific blog by ID
export async function PUT(
  req: Request,
  {
    params
  }: {
    params: { id: string };
  }
) {
  try {
    await connect();
    const blogId = params?.id;

    const requestData = createBlogSchema.safeParse(await req.json());

    if (!requestData.success) {
      const validationErrors = requestData.error.formErrors.fieldErrors;
      return new Response(JSON.stringify({ errors: validationErrors }), {
        status: 422
      });
    }

    const updatedBlogData = requestData.data;

    const options = {
      new: true,
      runValidators: true
    };

    const updatedBlog: IBlog | null = await Blog.findByIdAndUpdate(
      blogId,
      updatedBlogData,
      options
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found." });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog." });
  }
}
