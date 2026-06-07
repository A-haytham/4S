import { proxyBackendRequest } from "@/lib/utilities/backendProxy";
import { BACKEND_ENDPOINTS } from "@/lib/utilities/backendEndpoints";

const BACKEND_PUBLIC_BLOGS_API = BACKEND_ENDPOINTS.publicBlogs;
const BACKEND_ADMIN_BLOGS_API = BACKEND_ENDPOINTS.adminBlogs;

export async function GET() {
  return proxyBackendRequest({
    url: BACKEND_PUBLIC_BLOGS_API,
    method: "GET",
    backendLabel: "blogs",
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const authHeader = request.headers.get("authorization");
  return proxyBackendRequest({
    url: BACKEND_ADMIN_BLOGS_API,
    method: "POST",
    body: payload,
    authHeader,
    backendLabel: "blogs",
  });
}
