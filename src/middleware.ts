import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Check if the request is for the root URL
  const token = req.cookies.get("token"); // Assuming token is stored in cookies

  if (req.nextUrl.pathname === "/") {
    if (!token) {
      // Redirect to /login if no token found
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      // Redirect to /admin if token exists
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  if (
    req.nextUrl.pathname.startsWith("/list") ||
    req.nextUrl.pathname === "/admin"
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  // If the user is trying to access the login page and they are already authenticated, redirect to /dashboard/admin
  if (req.nextUrl.pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // Return response for other paths
  return NextResponse.next();
}
// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
