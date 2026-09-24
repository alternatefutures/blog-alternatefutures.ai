import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/posts";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <AdminDashboard initialPosts={getAllPosts()} />;
}
