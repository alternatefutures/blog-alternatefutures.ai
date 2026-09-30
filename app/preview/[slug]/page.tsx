import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPostBySlug, isPreviewTokenValid } from "@/lib/posts";

// Never prerendered and never cached: the token is checked on every request.
export const dynamic = "force-dynamic";

interface PreviewPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
}

// A preview must never be indexed, whatever the post's status.
export const metadata: Metadata = {
  title: "Draft preview",
  robots: { index: false, follow: false, nocache: true },
};

export default async function PreviewPage({ params, searchParams }: PreviewPageProps) {
  const [{ slug }, { token }] = await Promise.all([params, searchParams]);

  // Same 404 for a bad token and a missing post, so previews can't be enumerated.
  if (!isPreviewTokenValid(token)) notFound();

  const post = getPostBySlug(slug);
  if (!post || post.status === "archived") notFound();

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="article-page">
        <ArticleView post={post} />
      </main>
      <SiteFooter />
    </div>
  );
}
