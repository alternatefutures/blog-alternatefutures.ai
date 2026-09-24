import postsData from "@/content/posts.json";
import type { BlogPost } from "@/lib/types";

function clonePosts(): BlogPost[] {
  return structuredClone(postsData).map((post) => ({
    ...post,
    content: Array.isArray(post.content) ? post.content.join("\n") : post.content,
  })) as BlogPost[];
}

export function getAllPosts(): BlogPost[] {
  return clonePosts().sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts()
    .filter((post) => post.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt || b.updatedAt).getTime() -
        new Date(a.publishedAt || a.updatedAt).getTime(),
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getVisiblePosts(): BlogPost[] {
  return process.env.NODE_ENV === "development"
    ? getAllPosts().filter((post) => post.status !== "archived")
    : getPublishedPosts();
}

export function isLocallyReviewable(post: BlogPost): boolean {
  return post.status === "published" || process.env.NODE_ENV === "development";
}

export function formatPostDate(post: BlogPost): string {
  const value = post.publishedAt || post.updatedAt;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
