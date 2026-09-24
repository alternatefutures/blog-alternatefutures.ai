import { getPublishedPosts } from "@/lib/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.alternatefutures.ai";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = getPublishedPosts()
    .map(
      (post) => `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${siteUrl}/posts/${escapeXml(post.slug)}</link>
  <guid>${siteUrl}/posts/${escapeXml(post.slug)}</guid>
  <description>${escapeXml(post.excerpt)}</description>
  ${post.publishedAt ? `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>` : ""}
</item>`,
    )
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Alternate Futures Blog</title>
  <link>${siteUrl}</link>
  <description>Practical field notes on AI infrastructure and decentralized cloud.</description>
  <language>en-us</language>
  ${items}
</channel>
</rss>`, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
