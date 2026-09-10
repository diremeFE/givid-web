import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = token ? await verifySessionToken(token) : null;

    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(es|en|fr)/:path*",
    "/admin/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
