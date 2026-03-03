import { NextResponse } from "next/server";

const BACKEND_PUBLIC_CONTACT_API =
  process.env.CONTACT_API_URL ??
  process.env.CONTACTS_API_URL ??
  process.env.NEXT_PUBLIC_CONTACT_API_URL ??
  process.env.NEXT_PUBLIC_CONTACTS_API_URL ??
  "http://196.219.86.38:8080/api/contact";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(BACKEND_PUBLIC_CONTACT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type") ?? "";
    const rawPayload = await response.text();

    if (response.status >= 500) {
      return NextResponse.json(
        {
          message: `Contact backend returned status ${response.status}.`,
          details: rawPayload.slice(0, 300) || undefined,
        },
        { status: 502 },
      );
    }

    if (!rawPayload.trim()) {
      return new NextResponse(null, { status: response.status });
    }

    if (contentType.includes("application/json")) {
      try {
        return NextResponse.json(JSON.parse(rawPayload), {
          status: response.status,
        });
      } catch {
        return NextResponse.json(
          { message: "Invalid JSON response from contact backend." },
          { status: 502 },
        );
      }
    }

    return new NextResponse(rawPayload, { status: response.status });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown contact backend error.";
    return NextResponse.json(
      { message: `Failed to reach contact backend: ${errorMessage}` },
      { status: 502 },
    );
  }
}
