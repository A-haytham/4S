import { proxyBackendRequest } from "@/lib/utilities/backendProxy";
import { BACKEND_ENDPOINTS } from "@/lib/utilities/backendEndpoints";

const BACKEND_ADMIN_FAQS_API = BACKEND_ENDPOINTS.adminFaqs;

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const payload = await request.json();
  const authHeader = request.headers.get("authorization");
  return proxyBackendRequest({
    url: `${BACKEND_ADMIN_FAQS_API}/${id}`,
    method: "PATCH",
    body: payload,
    authHeader,
    backendLabel: "FAQs",
  });
}

export async function DELETE(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const authHeader = request.headers.get("authorization");
  return proxyBackendRequest({
    url: `${BACKEND_ADMIN_FAQS_API}/${id}`,
    method: "DELETE",
    authHeader,
    backendLabel: "FAQs",
  });
}
