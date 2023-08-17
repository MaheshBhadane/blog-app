import connect from "@/lib/db";
import { Blog } from "@/models";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// API to fetch list of blogs by author
export async function GET(req: NextApiRequest) {
  try {
    await connect();

    const data = await getToken({ req });
    const blogs = await Blog.find({ author: data?.id });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs." });
  }
}
