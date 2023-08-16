import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
interface BlogState {
  blogs: Blog[];
  selectedCategory: string;
}

const initialState: BlogState = {
  blogs: [],
  selectedCategory: "All"
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action: PayloadAction<Blog[]>) => {
      state.blogs = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    }
  }
});

export const fetchBlogs =
  (): ThunkAction<void, BlogState, unknown, any> => async (dispatch) => {
    try {
      const response = await fetch("/api/blog");
      const data = await response.json();
      const blogsWithFormattedDates = data.map((blog: Blog) => ({
        ...blog,
        created_at: new Date(blog.created_at)
      }));
      dispatch(setBlogs(blogsWithFormattedDates));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

export const { setBlogs, setSelectedCategory } = blogSlice.actions;
export default blogSlice.reducer;
