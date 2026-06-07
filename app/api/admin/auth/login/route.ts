import { NextResponse } from "next/server";
import { setToken } from "@/lib/utilities/auth";
import { createBackendUnavailableResponse } from "@/lib/utilities/backendProxy";
import { BACKEND_ENDPOINTS } from "@/lib/utilities/backendEndpoints";

const BACKEND_LOGIN_API = BACKEND_ENDPOINTS.authLogin;

export async function POST(request: Request) {
  const payload = await request.json();

  try {
    const response = await fetch(BACKEND_LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type") ?? "";
    const rawPayload = await response.text();

    if (contentType.includes("application/json")) {
      let jsonPayload: unknown = null;
      try {
        jsonPayload = rawPayload.trim() ? (JSON.parse(rawPayload) as unknown) : null;
      } catch {
        return NextResponse.json({ message: "Invalid JSON response from auth backend." }, { status: 502 });
      }

      if (
        response.ok &&
        jsonPayload &&
        typeof jsonPayload === "object" &&
        "token" in jsonPayload &&
        typeof (jsonPayload as { token?: unknown }).token === "string"
      ) {
        await setToken((jsonPayload as { token: string }).token);
      }

      return NextResponse.json(jsonPayload, { status: response.status });
    }

    return new NextResponse(rawPayload, { status: response.status });
  } catch (error) {
    return createBackendUnavailableResponse("auth", error);
  }
}
