import { NextResponse } from "next/server";

const BACKEND_ADMIN_BLOGS_API =
  process.env.ADMIN_BLOGS_API_URL ??
  "http://196.219.86.38:8080/api/admin/blogs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function proxyToBackend(
  method: "PATCH" | "DELETE",
  id: string,
  body?: unknown,
  authHeader?: string | null
) {
  const headers: Record<string, string> = {};
  if (body) {
    headers["Content-Type"] = "application/json";
  }
  if (authHeader) {
    headers.Authorization = authHeader;
  }

  const response = await fetch(`${BACKEND_ADMIN_BLOGS_API}/${id}`, {
    method,
    cache: "no-store",
    headers: Object.keys(headers).length ? headers : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  }

  const payload = await response.text();
  return new NextResponse(payload, { status: response.status });
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const payload = await request.json();
  const authHeader = request.headers.get("authorization");
  return proxyToBackend("PATCH", id, payload, authHeader);
}

export async function DELETE(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const authHeader = request.headers.get("authorization");
  return proxyToBackend("DELETE", id, undefined, authHeader);
}
