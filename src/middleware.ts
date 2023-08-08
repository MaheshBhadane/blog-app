import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/sign-in" || "/sign-up";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }
}

export const config = {
  matcher: ["/blog", "/create-blog"]
};
