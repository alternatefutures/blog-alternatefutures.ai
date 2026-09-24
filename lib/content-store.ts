import "server-only";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { BlogPost } from "@/lib/types";

const postsPath = path.join(process.cwd(), "content", "posts.json");

interface StoredPost extends Omit<BlogPost, "content"> {
  content: string[] | string;
}

export async function readStoredPosts(): Promise<BlogPost[]> {
  const source = await readFile(postsPath, "utf8");
  const posts = JSON.parse(source) as StoredPost[];
  return posts.map((post) => ({
    ...post,
    content: Array.isArray(post.content) ? post.content.join("\n") : post.content,
  }));
}

export async function writeStoredPosts(posts: BlogPost[]): Promise<void> {
  const stored = posts.map((post) => ({
    ...post,
    content: post.content.split("\n"),
  }));
  await writeFile(postsPath, `${JSON.stringify(stored, null, 2)}\n`, "utf8");
}

export function assertLocalWriteAccess(): void {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Blog editing is local-only until production authentication is configured.");
  }
}
