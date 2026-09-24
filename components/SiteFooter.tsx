import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Alternate Futures</strong>
        <p>Building infrastructure for human-computer alignment.</p>
      </div>
      <div className="footer-links">
        <Link href="/">Blog</Link>
        <a href="https://www.alternatefutures.ai">Alternate Futures</a>
        <a href="/rss.xml">RSS</a>
      </div>
    </footer>
  );
}
