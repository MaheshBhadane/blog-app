import { formatBlogs } from "@/lib";
import { setBlogs } from "./blogSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

//fetch all and authors blogs
export const fetchBlogs = createAsyncThunk(
  "blog/fetchBlogs",
  async (
    {
      authorId,
      category,
      page,
      limit,
      searchParam
    }: {
      authorId?: string;
      category?: string;
      page?: number;
      limit?: number;
      searchParam?: string;
    },
    { dispatch }
  ) => {
    let url = `/api/blog?page=${page}&limit=${limit}`;

    if (authorId) {
      url = `/api/author/blog?page=${page}&limit=${limit}`;
    }

    if (category) {
      url += `&category=${category}`;
    }

    if (searchParam) {
      url += `&query=${searchParam}`;
    }

    try {
      const response = await fetch(url);
      const { data, count } = await response.json();
      const blogsWithFormattedDates = formatBlogs(data);
      dispatch(setBlogs(blogsWithFormattedDates));
      return { blogsWithFormattedDates, count };
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw error;
    }
  }
);

//fetch specific blog
export const fetchBlogById = createAsyncThunk(
  "blog/fetchBlogById",
  async (blogId: string) => {
    const response = await fetch(`/api/blog/${blogId}`);
    const data = await response.json();
    return data;
  }
);

//Update Like Count
export const updateLikesAPI = async (blogId: string, updatedData: Blog) => {
  try {
    const response = await fetch(`/api/blog/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      console.error("Failed to update like count on the server.");
    }
  } catch (error) {
    console.error("Error updating like on the server:", error);
  }
};
