import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.alternatefutures.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alternate Futures Blog",
    template: "%s | Alternate Futures",
  },
  description:
    "Practical field notes on AI infrastructure, decentralized cloud, and building systems that serve people.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    type: "website",
    siteName: "Alternate Futures",
    title: "Alternate Futures Blog",
    description:
      "Practical field notes on AI infrastructure, decentralized cloud, and building systems that serve people.",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
