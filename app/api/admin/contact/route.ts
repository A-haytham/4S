import { proxyBackendRequest } from "@/lib/utilities/backendProxy";

// admin proxy only – public POST lives in app/api/contact/route.ts
const BACKEND_ADMIN_CONTACTS_API =
  process.env.ADMIN_CONTACTS_API_URL ??
  "http://196.219.86.38:8080/api/admin/contact";

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
