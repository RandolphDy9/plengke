import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isUnderConstruction =
    process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true";

  if (!isUnderConstruction) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Allow /studio and everything under it
  if (pathname.startsWith("/studio")) return NextResponse.next();

  // Allow the bypass API route
  if (pathname.startsWith("/api/bypass")) return NextResponse.next();

  // Allow the under-construction page itself to avoid redirect loop
  if (pathname === "/under-construction") return NextResponse.next();

  // Allow clients who have the bypass cookie
  const bypassCookie = request.cookies.get("plengke_bypass");
  if (bypassCookie?.value === process.env.BYPASS_SECRET) {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL("/under-construction", request.url)
  );
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
