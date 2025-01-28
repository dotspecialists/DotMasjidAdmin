import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(req) {
  const token = getCookie("token", { req }); // Fetch the token from cookies
  const url = req.nextUrl.clone();

  // Redirect unauthenticated users away from /admin
  if (!token && url.pathname === "/") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from /login
  if (token && url.pathname === "/") {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Continue to the requested route
}
// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
