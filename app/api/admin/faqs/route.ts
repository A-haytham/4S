import { proxyBackendRequest } from "@/lib/utilities/backendProxy";

const BACKEND_PUBLIC_FAQS_API =
  process.env.FAQS_API_URL ??
  process.env.NEXT_PUBLIC_FAQS_API_URL ??
  "http://196.219.86.38:8080/api/faqs";

const BACKEND_ADMIN_FAQS_API =
  process.env.ADMIN_FAQS_API_URL ??
  "http://196.219.86.38:8080/api/admin/faqs";

export async function GET() {
  return proxyBackendRequest({
    url: BACKEND_PUBLIC_FAQS_API,
    method: "GET",
    backendLabel: "FAQs",
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const authHeader = request.headers.get("authorization");
  return proxyBackendRequest({
    url: BACKEND_ADMIN_FAQS_API,
    method: "POST",
    body: payload,
    authHeader,
    backendLabel: "FAQs",
  });
}
