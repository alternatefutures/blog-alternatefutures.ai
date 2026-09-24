import { NextResponse } from "next/server";
import { z } from "zod";
import { assertLocalWriteAccess, readStoredPosts, writeStoredPosts } from "@/lib/content-store";
import type { BlogPost } from "@/lib/types";

export const runtime = "nodejs";

const postSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string(),
  content: z.string().min(1),
  coverImage: z.string().min(1),
  coverAlt: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  authorName: z.string().min(1),
  tags: z.array(z.string()).min(1),
  seoTitle: z.string(),
  seoDescription: z.string(),
  readingTimeMin: z.number().int().min(1).max(120),
  publishedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  reviewNotes: z.array(z.string()),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    assertLocalWriteAccess();
    const { slug } = await params;
    const candidate = postSchema.parse(await request.json());
    const posts = await readStoredPosts();
    const index = posts.findIndex((post) => post.slug === slug);
    if (index === -1) {
      return NextResponse.json({ error: "Draft not found." }, { status: 404 });
    }
    if (candidate.slug !== slug && posts.some((post) => post.slug === candidate.slug)) {
      return NextResponse.json({ error: "That slug is already in use." }, { status: 409 });
    }

    const updated: BlogPost = {
      ...candidate,
      updatedAt: new Date().toISOString(),
      publishedAt:
        candidate.status === "published"
          ? candidate.publishedAt || new Date().toISOString()
          : candidate.publishedAt,
    };
    posts[index] = updated;
    await writeStoredPosts(posts);
    return NextResponse.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save the draft.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
