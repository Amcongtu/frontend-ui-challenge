import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";

  console.log("Middleware - isLoggedIn:", isLoggedIn, "path:", pathname);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|static/|favicon.ico).*)"],
};
