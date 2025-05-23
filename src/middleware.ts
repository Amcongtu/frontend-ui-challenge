import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";
  const role = request.cookies.get("role")?.value;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isDashboardPage = pathname.startsWith("/dashboard");

  // Redirect unauthenticated users trying to access protected pages
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from login/register pages
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Prevent non-admin users from accessing the dashboard
  if (isDashboardPage && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // (Optional) Redirect admin users from home page to dashboard
  // Uncomment if you want to auto-redirect admin users when they visit "/"
  // if (pathname === "/" && isLoggedIn && role === "admin") {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except Next.js internals and static assets
  matcher: ["/((?!_next/|static/|favicon.ico).*)"],
};
