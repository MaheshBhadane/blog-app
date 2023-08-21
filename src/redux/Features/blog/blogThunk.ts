import { ThunkAction } from "redux-thunk";
import { formatBlogs } from "@/lib";
import { setBlogs } from "./blogSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBlogs =
  (authorId?: string): ThunkAction<void, BlogState, unknown, any> =>
  async (dispatch) => {
    try {
      let url = "/api/blog";
      if (authorId) {
        url = "/api/author/blog";
      }

      const response = await fetch(url);
      const data = await response.json();
      const blogsWithFormattedDates = formatBlogs(data);
      dispatch(setBlogs(blogsWithFormattedDates));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

export const fetchBlogById = createAsyncThunk(
  "blog/fetchBlogById",
  async (blogId: string) => {
    const response = await fetch(`/api/blog/${blogId}`);
    const data = await response.json();
    return data;
  }
);
