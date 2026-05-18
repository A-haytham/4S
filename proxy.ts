import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const legacyHomePaths = new Set(["/الرئيسية"]);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let decodedPathname = pathname;

  try {
    decodedPathname = decodeURIComponent(pathname);
  } catch {
    decodedPathname = pathname;
  }

  if (legacyHomePaths.has(pathname) || legacyHomePaths.has(decodedPathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}
 
export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
