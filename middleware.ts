// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define routes that are publicly accessible
const public_routes = [
  "/",
  "/facility",
  "/membership",
  "/season-pass",
  "/user"
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (public_routes.some((route) => pathname === route)) {
    return NextResponse.next(); // Allow access without authentication
  }

  // Extract the token from cookies
  const token = req.cookies.get("token")?.value;
  // If token is not found and the user is not already on the login page, redirect them

  if (!token && !req.nextUrl.pathname.startsWith("/auth/")) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    const response = NextResponse.redirect(url);
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  }
  if (token && pathname.startsWith("/auth/")) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    const response = NextResponse.redirect(url);
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  }

  // Allow the request to proceed if token exists or user is on the login page
  return NextResponse.next();
}

// Apply middleware to all routes except static files
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|sitemap.xml).*)"
  ]
};
