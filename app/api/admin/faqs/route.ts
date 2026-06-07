import { proxyBackendRequest } from "@/lib/utilities/backendProxy";
import { BACKEND_ENDPOINTS } from "@/lib/utilities/backendEndpoints";

const BACKEND_PUBLIC_FAQS_API = BACKEND_ENDPOINTS.publicFaqs;
const BACKEND_ADMIN_FAQS_API = BACKEND_ENDPOINTS.adminFaqs;

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
