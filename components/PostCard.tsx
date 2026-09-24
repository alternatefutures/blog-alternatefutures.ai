import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { formatPostDate } from "@/lib/posts";

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className={featured ? "post-card post-card-featured" : "post-card"}>
      <Link href={`/posts/${post.slug}`} className="post-card-media" tabIndex={-1}>
        <Image
          src={post.coverImage}
          alt={post.coverAlt}
          width={1600}
          height={900}
          sizes={featured ? "(max-width: 900px) 100vw, 65vw" : "(max-width: 680px) 100vw, 50vw"}
          priority={featured}
          unoptimized={post.coverImage.endsWith(".svg")}
        />
      </Link>
      <div className="post-card-copy">
        <div className="post-card-kicker">
          <span>{post.tags[0]}</span>
          {post.status === "draft" && <span className="draft-label">Draft preview</span>}
        </div>
        <h2>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h2>
        <p>{post.excerpt}</p>
        <div className="post-card-meta">
          <span>{formatPostDate(post)}</span>
          <span>{post.readingTimeMin} min read</span>
          <Link href={`/posts/${post.slug}`} className="read-link" aria-label={`Read ${post.title}`}>
            Read <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
