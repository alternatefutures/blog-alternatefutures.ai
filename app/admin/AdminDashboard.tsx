"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, FilePlus2, PencilLine } from "lucide-react";
import type { BlogPost } from "@/lib/types";

export function AdminDashboard({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts] = useState(initialPosts);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const drafts = posts.filter((post) => post.status === "draft").length;
  const openNotes = posts.reduce((total, post) => total + post.reviewNotes.length, 0);

  async function createDraft() {
    setCreating(true);
    setError("");
    try {
      const response = await fetch("/api/posts", { method: "POST" });
      const body = (await response.json()) as BlogPost | { error?: string };
      if (!response.ok) {
        throw new Error("error" in body && body.error ? body.error : "Could not create the draft.");
      }
      router.push(`/admin/posts/${(body as BlogPost).slug}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not create the draft.");
      setCreating(false);
    }
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <Link href="/" className="back-link"><ArrowLeft size={16} /> Blog preview</Link>
          <h1>Review desk</h1>
          <p>Review and manage articles in the local content repository.</p>
        </div>
        <button className="button-primary" onClick={createDraft} disabled={creating}>
          <FilePlus2 size={17} /> {creating ? "Creating..." : "New draft"}
        </button>
      </header>

      <section className="admin-summary" aria-label="Review summary">
        <div><span>Drafts</span><strong>{drafts}</strong></div>
        <div><span>Published</span><strong>{posts.filter((post) => post.status === "published").length}</strong></div>
        <div><span>Open review notes</span><strong>{openNotes}</strong></div>
      </section>

      {error && <p className="admin-error" role="alert">{error}</p>}

      <section className="admin-post-list" aria-label="Draft posts">
        <div className="admin-list-heading">
          <span>Post</span><span>Status</span><span>Review</span><span>Actions</span>
        </div>
        {posts.map((post) => (
          <article className="admin-post-row" key={post.id}>
            <div className="admin-post-title">
              <span className="admin-index">{String(posts.indexOf(post) + 1).padStart(2, "0")}</span>
              <div><h2>{post.title}</h2><p>{post.excerpt}</p></div>
            </div>
            <div><span className={`status status-${post.status}`}>{post.status}</span></div>
            <div className="review-count">
              <strong>{post.reviewNotes.length}</strong>
              <span>{post.reviewNotes.length === 1 ? "note" : "notes"}</span>
            </div>
            <div className="admin-row-actions">
              <Link href={`/posts/${post.slug}`} title="Preview post" aria-label={`Preview ${post.title}`}>
                <ExternalLink size={17} />
              </Link>
              <Link href={`/admin/posts/${post.slug}`} title="Edit post" aria-label={`Edit ${post.title}`}>
                <PencilLine size={17} />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
