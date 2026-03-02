import { NextResponse } from "next/server";

const BACKEND_PUBLIC_BLOGS_API =
  process.env.BLOGS_API_URL ??
  process.env.NEXT_PUBLIC_BLOGS_API_URL ??
  "http://196.219.86.38:8080/api/blogs";

const BACKEND_ADMIN_BLOGS_API =
  process.env.ADMIN_BLOGS_API_URL ??
  "http://196.219.86.38:8080/api/admin/blogs";

async function proxyToBackend(url: string, method: "GET" | "POST", body?: unknown, authHeader?: string | null) {
  const headers: Record<string, string> = {};
  if (body) {
    headers["Content-Type"] = "application/json";
  }
  if (authHeader) {
    headers.Authorization = authHeader;
  }

  const response = await fetch(url, {
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

export async function GET() {
  return proxyToBackend(BACKEND_PUBLIC_BLOGS_API, "GET");
}

export async function POST(request: Request) {
  const payload = await request.json();
  const authHeader = request.headers.get("authorization");
  return proxyToBackend(BACKEND_ADMIN_BLOGS_API, "POST", payload, authHeader);
}
