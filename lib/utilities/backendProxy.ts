import { NextResponse } from "next/server";

type ProxyBackendRequestOptions = {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  backendLabel: string;
  body?: unknown;
  authHeader?: string | null;
};

export function createBackendUnavailableResponse(backendLabel: string, error: unknown) {
  const errorMessage = error instanceof Error ? error.message : "Unknown backend error.";

  return NextResponse.json(
    { message: `Failed to reach ${backendLabel} backend: ${errorMessage}` },
    { status: 502 },
  );
}

export async function proxyBackendRequest({
  url,
  method,
  backendLabel,
  body,
  authHeader,
}: ProxyBackendRequestOptions) {
  const headers: Record<string, string> = {};

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (authHeader) {
    headers.Authorization = authHeader;
  }

  try {
    const response = await fetch(url, {
      method,
      cache: "no-store",
      headers: Object.keys(headers).length ? headers : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get("content-type") ?? "";
    const rawPayload = await response.text();

    if (!rawPayload.trim()) {
      return new NextResponse(null, { status: response.status });
    }

    if (contentType.includes("application/json")) {
      try {
        return NextResponse.json(JSON.parse(rawPayload), { status: response.status });
      } catch {
        return NextResponse.json(
          { message: `Invalid JSON response from ${backendLabel} backend.` },
          { status: 502 },
        );
      }
    }

    return new NextResponse(rawPayload, { status: response.status });
  } catch (error) {
    return createBackendUnavailableResponse(backendLabel, error);
  }
}
