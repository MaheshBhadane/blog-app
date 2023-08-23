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
    const searchQuery = queryParams.get("query");
    const category = queryParams.get("category");
    let page = Number(queryParams.get("page")) || 1;
    let limit = Number(queryParams.get("limit")) || 10;

    let skip = (page - 1) * limit;

    let query = Blog.find({ author: data?.id });

    if (searchQuery) {
      query = query.find({
        title: { $regex: searchQuery, $options: "i" }
      });
    }

    if (category) {
      query.where("category").equals(category);
    }

    const totalCountQuery = Blog.find({ author: data?.id });

    const totalCount = await totalCountQuery.countDocuments();

    query = query.skip(skip).limit(limit);
    query.sort({ like_count: -1 });

    const blogs = await query.populate({
      path: "author",
      select: "full_name author_type"
    });

    const response = { data: blogs, count: totalCount };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs." });
  }
}
