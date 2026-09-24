export type PostStatus = "draft" | "published" | "archived";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverAlt: string;
  status: PostStatus;
  authorName: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  readingTimeMin: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  reviewNotes: string[];
}
