import { NextResponse } from "next/server";

const BACKEND_PUBLIC_CONTACT_API =
  process.env.CONTACT_API_URL ??
  process.env.CONTACTS_API_URL ??
  process.env.NEXT_PUBLIC_CONTACT_API_URL ??
  process.env.NEXT_PUBLIC_CONTACTS_API_URL ??
  "http://196.219.86.38:8080/api/contact";

type ContactRouteErrorSource = "request" | "backend" | "gateway";

const buildErrorResponse = (
  source: ContactRouteErrorSource,
  message: string,
  status: number,
  details?: string,
) =>
  NextResponse.json(
    {
      source,
      message,
      details,
    },
    { status },
  );

const extractBackendErrorDetails = (error: unknown) => {
  if (!(error instanceof Error)) {
    return {
      message: "Unknown contact backend error.",
      details: undefined as string | undefined,
    };
  }

  const cause =
    "cause" in error && error.cause && typeof error.cause === "object"
      ? (error.cause as {
          code?: string;
          errno?: number;
          syscall?: string;
          address?: string;
          port?: number;
          message?: string;
        })
      : null;

  const detailParts = [
    cause?.code,
    cause?.syscall,
    cause?.address,
    typeof cause?.port === "number" ? String(cause.port) : undefined,
    cause?.message && cause.message !== error.message ? cause.message : undefined,
  ].filter(Boolean);

  return {
    message: error.message || "Unknown contact backend error.",
    details: detailParts.length > 0 ? detailParts.join(" | ") : undefined,
  };
};

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return buildErrorResponse("request", "Invalid JSON body.", 400);
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
      return buildErrorResponse(
        "backend",
        `Contact backend returned status ${response.status}.`,
        502,
        rawPayload.slice(0, 300) || undefined,
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
        return buildErrorResponse(
          "gateway",
          "Invalid JSON response from contact backend.",
          502,
        );
      }
    }

    return new NextResponse(rawPayload, { status: response.status });
  } catch (error) {
    const { message, details } = extractBackendErrorDetails(error);
    return buildErrorResponse(
      "backend",
      `Failed to reach contact backend: ${message}`,
      502,
      details,
    );
  }
}
