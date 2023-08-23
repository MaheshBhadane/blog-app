import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBlogById, fetchBlogs } from "./blogThunk";

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  selectedCategory: "All",
  isLoading: false,
  count: 0
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
    updateLikeCount(state, action) {
      const blogId = action.payload;
      const blogToUpdate = state.blogs.find((blog) => blog._id === blogId);
      if (blogToUpdate) {
        blogToUpdate.like_count += 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload.blogsWithFormattedDates;
        state.count = action.payload.count;
        state.isLoading = false;
      })
      .addCase(fetchBlogs.rejected, (state) => {
        state.isLoading = false;
        state.blogs = [];
        state.count = 0;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.currentBlog = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBlogById.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { setBlogs, setCurrentBlog, setLoading, updateLikeCount } =
  blogSlice.actions;
export default blogSlice.reducer;
