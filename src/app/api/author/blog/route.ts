import connect from "@/lib/db";
import { Blog } from "@/models";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

// API to fetch list of blogs by author with category condition
export async function GET(req: NextRequest) {
  try {
    await connect();

    const data = await getToken({ req });

    const queryParams = new URLSearchParams(req.url.split("?")[1]);
    const category = queryParams.get("category");

    const query = Blog.find({ author: data?.id });

    if (category) {
      query.where("category").equals(category);
    }
    query.sort({ like_count: -1 });

    const blogs = await query.populate({
      path: "author",
      select: "full_name author_type"
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs." });
  }
}
