import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="not-found">
        <p className="section-label">404</p>
        <h1>This field note is not here.</h1>
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Return to the blog</Link>
      </main>
    </div>
  );
}
