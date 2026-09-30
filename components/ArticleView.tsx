import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, PencilLine } from "lucide-react";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { formatPostDate } from "@/lib/posts";
import type { BlogPost } from "@/lib/types";

interface ArticleViewProps {
  post: BlogPost;
  showAdmin?: boolean;
}

export function ArticleView({ post, showAdmin = false }: ArticleViewProps) {
  return (
    <article>
      <div className="article-topline">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Back to all posts
        </Link>
        {showAdmin && (
          <Link href={`/admin/posts/${post.slug}`} className="edit-link">
            <PencilLine size={15} /> Edit draft
          </Link>
        )}
      </div>

      <header className="article-header">
        <div className="article-tags">
          {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
          {post.status === "draft" && <span className="draft-label">Draft preview</span>}
        </div>
        <h1>{post.title}</h1>
        <p className="article-dek">{post.excerpt}</p>
        <div className="article-meta">
          <span>{post.authorName}</span>
          <span>{formatPostDate(post)}</span>
          <span>{post.readingTimeMin} min read</span>
        </div>
      </header>

      <figure className="article-cover">
        <Image
          src={post.coverImage}
          alt={post.coverAlt}
          width={1800}
          height={1000}
          sizes="(max-width: 1000px) 100vw, 1000px"
          priority
          unoptimized={post.coverImage.endsWith(".svg")}
        />
        <figcaption>{post.coverAlt}</figcaption>
      </figure>

      <MarkdownArticle content={post.content} />
    </article>
  );
}
