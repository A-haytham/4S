import { proxyBackendRequest } from "@/lib/utilities/backendProxy";
import { BACKEND_ENDPOINTS } from "@/lib/utilities/backendEndpoints";

// admin proxy only – public POST lives in app/api/contact/route.ts
const BACKEND_ADMIN_CONTACTS_API = BACKEND_ENDPOINTS.adminContact;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  return proxyBackendRequest({
    url: BACKEND_ADMIN_CONTACTS_API,
    method: "GET",
    authHeader,
    backendLabel: "contact",
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const authHeader = request.headers.get("authorization");
  return proxyBackendRequest({
    url: BACKEND_ADMIN_CONTACTS_API,
    method: "POST",
    body,
    authHeader,
    backendLabel: "contact",
  });
}
