"use client";
import { IBlog } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogState {
  blogs: IBlog[];
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  error: null
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<any>) => {
      state.blogs.push(action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  }
});

export const { addBlog, setError } = blogSlice.actions;
export default blogSlice.reducer;
