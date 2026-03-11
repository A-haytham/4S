import { proxyBackendRequest } from "@/lib/utilities/backendProxy";

const BACKEND_PUBLIC_BLOGS_API =
  process.env.BLOGS_API_URL ??
  process.env.NEXT_PUBLIC_BLOGS_API_URL ??
  "http://196.219.86.38:8080/api/blogs";

const BACKEND_ADMIN_BLOGS_API =
  process.env.ADMIN_BLOGS_API_URL ??
  "http://196.219.86.38:8080/api/admin/blogs";

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
