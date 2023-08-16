/* eslint-disable no-unused-vars */
interface Blog {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  category: string;
  is_editor_pick: boolean;
  like_count: number;
  created_at: Date;
  updated_at: Date;
  author: string;
  author_type: string;
}

interface BlogState {
  blogs: Blog[];
  selectedCategory: string;
}
