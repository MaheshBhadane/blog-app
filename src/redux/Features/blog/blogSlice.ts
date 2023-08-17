import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    },
    setCurrentBlog: (state, action: PayloadAction<Blog>) => {
      state.currentBlog = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setBlogs, setCurrentBlog, setLoading } = blogSlice.actions;
export default blogSlice.reducer;
