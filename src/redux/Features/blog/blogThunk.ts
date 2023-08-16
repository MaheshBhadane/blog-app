import { ThunkAction } from "redux-thunk";
import { formatBlogs } from "@/lib";
import { setBlogs } from "./blogSlice";

export const fetchBlogs =
  (): ThunkAction<void, BlogState, unknown, any> => async (dispatch) => {
    try {
      const response = await fetch("/api/blog");
      const data = await response.json();
      const blogsWithFormattedDates = formatBlogs(data);
      dispatch(setBlogs(blogsWithFormattedDates));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
