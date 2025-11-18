// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const publicPages = ["/login", "/Signup", "/"];
  const isPublicPage = publicPages.includes(request.nextUrl.pathname);

  // If trying to access protected page without token, redirect to login
  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already logged in and trying to access login/signup, redirect to dashboard
  if (token && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/Signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
