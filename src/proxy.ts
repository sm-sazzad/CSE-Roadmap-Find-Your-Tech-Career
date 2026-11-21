import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const SECTOR_PREFIX = "/sector";
const PROGRESS_PREFIX = "/api/progress";
const LOGIN_PATH = "/login";
const VERIFY_PATH = "/verify-email";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (pathname.startsWith(PROGRESS_PREFIX)) {
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!session.user.emailVerified) {
      return NextResponse.json({ error: "Email not verified" }, { status: 403 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith(SECTOR_PREFIX)) {
    if (!session) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
    if (!session.user.emailVerified) {
      return NextResponse.redirect(new URL(VERIFY_PATH, request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sector/:path*", "/api/progress/:path*"],
};
