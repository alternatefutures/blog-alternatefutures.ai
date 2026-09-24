import { NextResponse } from "next/server";
import { assertLocalWriteAccess, readStoredPosts, writeStoredPosts } from "@/lib/content-store";
import type { BlogPost } from "@/lib/types";

export const runtime = "nodejs";

export async function POST() {
  try {
    assertLocalWriteAccess();
    const posts = await readStoredPosts();
    const now = new Date().toISOString();
    const slug = `untitled-${Date.now()}`;
    const post: BlogPost = {
      id: slug,
      title: "Untitled field note",
      slug,
      excerpt: "",
      content: "Start writing here.",
      coverImage: "/images/alternate-futures-card.png",
      coverAlt: "Alternate Futures brand card",
      status: "draft",
      authorName: "Alternate Futures Team",
      tags: ["Field Note"],
      seoTitle: "",
      seoDescription: "",
      readingTimeMin: 1,
      publishedAt: null,
      createdAt: now,
      updatedAt: now,
      reviewNotes: [],
    };
    await writeStoredPosts([post, ...posts]);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create the draft." },
      { status: 403 },
    );
  }
}
