import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import { PostEditor } from "./PostEditor";

export const dynamic = "force-dynamic";

export default async function PostEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <PostEditor initialPost={post} />;
}
