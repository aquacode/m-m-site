import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(en|fr|fa)/:path*",
    // Exclude /studio so Sanity Studio isn't locale-prefixed
    "/((?!_next|_vercel|studio|.*\\..*).*)",
  ],
};
