import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllPosts, getPostBySlug, isLocallyReviewable } from "@/lib/posts";

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

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="article-page">
        <ArticleView post={post} showAdmin={process.env.NODE_ENV === "development"} />
      </main>
      <SiteFooter />
    </div>
  );
}
