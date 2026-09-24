import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Rss } from "lucide-react";

export function SiteHeader() {
  const showAdmin = process.env.NODE_ENV === "development";

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-lockup" aria-label="Alternate Futures Blog home">
          <Image src="/brand/mark.svg" alt="" width={35} height={32} priority />
          <span className="brand-name">Alternate Futures</span>
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-edition">Blog</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {showAdmin && <Link href="/admin">Review desk</Link>}
          <a href="/rss.xml" aria-label="RSS feed" title="RSS feed">
            <Rss size={17} strokeWidth={1.8} />
          </a>
          <a href="https://www.alternatefutures.ai" className="main-site-link">
            Main site <ArrowUpRight size={15} />
          </a>
        </nav>
      </div>
    </header>
  );
}
