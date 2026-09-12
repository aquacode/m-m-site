import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** Private routes that require auth (Auth.js TBD). Locale-prefixed. */
const PRIVATE_PATH_RE =
  /^\/(en|fr|fa)\/(blog|journeys|gallery)(\/.*)?$/;

/**
 * Until Auth.js is wired up, treat every visitor as unauthenticated and
 * bounce private routes to the login placeholder (preserving callback URL).
 */
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PRIVATE_PATH_RE.test(pathname)) {
    const locale = pathname.split("/")[1] ?? routing.defaultLocale;
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${locale}/login`;
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(en|fr|fa)/:path*",
    // Exclude /studio so Sanity Studio isn't locale-prefixed
    "/((?!_next|_vercel|studio|.*\\..*).*)",
  ],
};
