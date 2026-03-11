import { proxyBackendRequest } from "@/lib/utilities/backendProxy";

const BACKEND_ADMIN_BLOGS_API =
  process.env.ADMIN_BLOGS_API_URL ??
  "http://196.219.86.38:8080/api/admin/blogs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const payload = await request.json();
  const authHeader = request.headers.get("authorization");
  return proxyBackendRequest({
    url: `${BACKEND_ADMIN_BLOGS_API}/${id}`,
    method: "PATCH",
    body: payload,
    authHeader,
    backendLabel: "blogs",
  });
}

export async function DELETE(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const authHeader = request.headers.get("authorization");
  return proxyBackendRequest({
    url: `${BACKEND_ADMIN_BLOGS_API}/${id}`,
    method: "DELETE",
    authHeader,
    backendLabel: "blogs",
  });
}
