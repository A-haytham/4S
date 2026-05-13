import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getToken } from "@/lib/utilities/auth";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Admin | 4S Systems",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const initialToken = (await getToken()) ?? "";

  return <AdminDashboard initialToken={initialToken} />;
}
