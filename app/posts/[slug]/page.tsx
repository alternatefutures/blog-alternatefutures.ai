import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, PencilLine } from "lucide-react";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  formatPostDate,
  getAllPosts,
  getPostBySlug,
  isLocallyReviewable,
} from "@/lib/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts()
    .filter((post) => post.status === "published")
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !isLocallyReviewable(post)) return { title: "Post not found" };

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  return {
    title,
    description,
    robots: post.status === "draft" ? { index: false, follow: false } : undefined,
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      images: [{ url: post.coverImage, alt: post.coverAlt }],
      publishedTime: post.publishedAt || undefined,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !isLocallyReviewable(post)) notFound();

  const showAdmin = process.env.NODE_ENV === "development";

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="article-page">
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
      </main>
      <SiteFooter />
    </div>
  );
}
