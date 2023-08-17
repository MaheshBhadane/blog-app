/* eslint-disable no-unused-vars */
interface Blog {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  category: BlogCategory;
  is_editor_pick: boolean;
  like_count: number;
  created_at: Date;
  updated_at: Date;
  author: Author;
}

interface Author {
  full_name: string;
  author_type: string;
}

type BlogCategory =
  | "Adventure"
  | "Travel"
  | "Fashion"
  | "Technology"
  | "Branding";

interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  selectedCategory: string;
  isLoading: boolean;
}
