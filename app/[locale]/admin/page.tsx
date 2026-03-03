import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getToken } from "@/lib/utilities/auth";

export default async function AdminPage() {
  const initialToken = (await getToken()) ?? "";

  return <AdminDashboard initialToken={initialToken} />;
}
