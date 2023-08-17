import { ThunkAction } from "redux-thunk";
import { formatBlogs } from "@/lib";
import { setBlogs } from "./blogSlice";

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
