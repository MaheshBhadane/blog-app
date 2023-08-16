import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BlogState = {
  blogs: [],
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setBlogs, setLoading } = blogSlice.actions;
export default blogSlice.reducer;
