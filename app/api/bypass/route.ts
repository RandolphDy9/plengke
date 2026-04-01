import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!secret || secret !== process.env.BYPASS_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const redirectTo = request.nextUrl.searchParams.get("redirect") ?? "/";
  const response = NextResponse.redirect(new URL(redirectTo, request.url));

  // Cookie valid for 30 days
  response.cookies.set("plengke_bypass", process.env.BYPASS_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}
