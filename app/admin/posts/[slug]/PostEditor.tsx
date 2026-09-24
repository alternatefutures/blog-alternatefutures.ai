"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ExternalLink, Save } from "lucide-react";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import type { BlogPost, PostStatus } from "@/lib/types";

export function PostEditor({ initialPost }: { initialPost: BlogPost }) {
  const [post, setPost] = useState(initialPost);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const wordCount = useMemo(
    () => post.content.trim().split(/\s+/).filter(Boolean).length,
    [post.content],
  );

  function update<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setPost((current) => ({ ...current, [key]: value }));
    setMessage("");
  }

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch(`/api/posts/${initialPost.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      const body = (await response.json()) as BlogPost | { error?: string };
      if (!response.ok) {
        throw new Error("error" in body && body.error ? body.error : "Could not save changes.");
      }
      const savedPost = body as BlogPost;
      setPost(savedPost);
      setMessage("Saved to the local repository.");
      if (savedPost.slug !== initialPost.slug) router.replace(`/admin/posts/${savedPost.slug}`);
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save changes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="editor-shell">
      <header className="editor-header">
        <div>
          <Link href="/admin" className="back-link"><ArrowLeft size={16} /> Review desk</Link>
          <h1>{post.title || "Untitled field note"}</h1>
        </div>
        <div className="editor-header-actions">
          <Link href={`/posts/${post.slug}`} className="button-secondary" target="_blank">
            Preview <ExternalLink size={15} />
          </Link>
          <button className="button-primary" onClick={save} disabled={saving}>
            {message ? <Check size={17} /> : <Save size={17} />}
            {saving ? "Saving..." : message || "Save changes"}
          </button>
        </div>
      </header>

      {error && <p className="admin-error" role="alert">{error}</p>}

      <div className="editor-layout">
        <section className="editor-main">
          <label className="field-label" htmlFor="title">Title</label>
          <input id="title" className="title-input" value={post.title} onChange={(event) => update("title", event.target.value)} />

          <label className="field-label" htmlFor="excerpt">Excerpt</label>
          <textarea id="excerpt" className="excerpt-input" value={post.excerpt} onChange={(event) => update("excerpt", event.target.value)} rows={3} />

          <div className="editor-mode-row">
            <div className="segmented-control" aria-label="Editor mode">
              <button className={mode === "write" ? "active" : ""} onClick={() => setMode("write")}>Write</button>
              <button className={mode === "preview" ? "active" : ""} onClick={() => setMode("preview")}>Preview</button>
            </div>
            <span>{wordCount} words</span>
          </div>

          {mode === "write" ? (
            <textarea className="content-editor" value={post.content} onChange={(event) => update("content", event.target.value)} aria-label="Post content in Markdown" />
          ) : (
            <div className="editor-preview"><MarkdownArticle content={post.content} /></div>
          )}
        </section>

        <aside className="editor-sidebar">
          <section>
            <h2>Publication</h2>
            <div className="status-control" role="group" aria-label="Post status">
              {(["draft", "published", "archived"] as PostStatus[]).map((status) => (
                <button key={status} className={post.status === status ? "active" : ""} onClick={() => update("status", status)}>{status}</button>
              ))}
            </div>
          </section>

          <section>
            <h2>Details</h2>
            <label className="field-label" htmlFor="slug">Slug</label>
            <input id="slug" value={post.slug} onChange={(event) => update("slug", event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} />
            <label className="field-label" htmlFor="author">Author</label>
            <input id="author" value={post.authorName} onChange={(event) => update("authorName", event.target.value)} />
            <label className="field-label" htmlFor="tags">Tags</label>
            <input id="tags" value={post.tags.join(", ")} onChange={(event) => update("tags", event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} />
            <label className="field-label" htmlFor="reading-time">Reading time</label>
            <input id="reading-time" type="number" min="1" value={post.readingTimeMin} onChange={(event) => update("readingTimeMin", Math.max(1, Number(event.target.value)))} />
          </section>

          <section>
            <h2>Image</h2>
            <label className="field-label" htmlFor="cover-image">Image path</label>
            <input id="cover-image" value={post.coverImage} onChange={(event) => update("coverImage", event.target.value)} />
            <label className="field-label" htmlFor="cover-alt">Alt text</label>
            <input id="cover-alt" value={post.coverAlt} onChange={(event) => update("coverAlt", event.target.value)} />
          </section>

          <section>
            <h2>Search</h2>
            <label className="field-label" htmlFor="seo-title">SEO title</label>
            <input id="seo-title" value={post.seoTitle} onChange={(event) => update("seoTitle", event.target.value)} />
            <label className="field-label" htmlFor="seo-description">SEO description</label>
            <textarea id="seo-description" rows={4} value={post.seoDescription} onChange={(event) => update("seoDescription", event.target.value)} />
          </section>

          <section className="review-notes-section">
            <h2>Review notes <span>{post.reviewNotes.length}</span></h2>
            <textarea
              aria-label="Review notes, one per line"
              rows={9}
              value={post.reviewNotes.join("\n")}
              onChange={(event) => update("reviewNotes", event.target.value.split("\n").filter(Boolean))}
            />
          </section>
        </aside>
      </div>
    </main>
  );
}
