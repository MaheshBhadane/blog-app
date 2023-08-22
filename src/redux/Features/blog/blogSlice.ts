import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBlogById, searchBlogs } from "./blogThunk";

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  selectedCategory: "All",
  isLoading: false
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action: PayloadAction<Blog[]>) => {
      state.blogs = action.payload;
      state.isLoading = false;
    },
    setCurrentBlog: (state, action: PayloadAction<Blog>) => {
      state.currentBlog = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    appendBlogs: (state, action: PayloadAction<Blog[]>) => {
      state.blogs.push(...action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.currentBlog = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBlogById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(searchBlogs.pending, (state) => {
        state.isLoading = true;
        state.blogs = [];
      })
      .addCase(searchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.isLoading = false;
      })
      .addCase(searchBlogs.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { setBlogs, setCurrentBlog, setLoading, appendBlogs } =
  blogSlice.actions;
export default blogSlice.reducer;
