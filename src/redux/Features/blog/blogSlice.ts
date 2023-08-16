import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    }
  }
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
