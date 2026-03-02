import { NextResponse } from "next/server";

const BACKEND_LOGIN_API =
  process.env.AUTH_API_URL ??
  "http://196.219.86.38:8080/api/auth/login";

export async function POST(request: Request) {
  const payload = await request.json();

  const response = await fetch(BACKEND_LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const jsonPayload = await response.json();
    return NextResponse.json(jsonPayload, { status: response.status });
  }

  const textPayload = await response.text();
  return new NextResponse(textPayload, { status: response.status });
}
