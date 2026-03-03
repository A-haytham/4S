import { NextResponse } from "next/server";

// admin proxy only – public POST lives in app/api/contact/route.ts
const BACKEND_ADMIN_CONTACTS_API =
  process.env.ADMIN_CONTACTS_API_URL ??
  "http://196.219.86.38:8080/api/admin/contact";

async function proxyToBackend(
  url: string,
  method: "GET" | "POST",
  body?: unknown,
  authHeader?: string | null,
) {
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

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  return proxyToBackend(
    BACKEND_ADMIN_CONTACTS_API,
    "GET",
    undefined,
    authHeader,
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const authHeader = request.headers.get("authorization");
  return proxyToBackend(BACKEND_ADMIN_CONTACTS_API, "POST", body, authHeader);
}
