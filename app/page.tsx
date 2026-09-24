import { PostCard } from "@/components/PostCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getVisiblePosts } from "@/lib/posts";

export default function Home() {
  const posts = getVisiblePosts();
  const [featured, ...rest] = posts;
  const isReviewMode = process.env.NODE_ENV === "development";

  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="blog-intro">
          <div className="eyebrow-row">
            <span>Field notes / 01</span>
            {isReviewMode && <span className="review-mode">Local review mode</span>}
          </div>
          <h1>Alternate Futures Blog</h1>
          <p>
            Practical writing about AI infrastructure, distributed systems, and
            the choices that shape how technology serves people.
          </p>
        </section>

        {featured ? (
          <section className="post-list" aria-label="Articles">
            <PostCard post={featured} featured />
            {rest.length > 0 && (
              <div className="post-grid">
                {rest.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <section className="empty-blog">
            <p className="section-label">Issue 01</p>
            <h2>First notes are in review.</h2>
            <p>The blog will open after the initial field guides are approved.</p>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
