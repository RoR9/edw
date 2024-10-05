import { NextRequest, NextResponse } from "next/server";
import { decrypt, encrypt } from "./lib/utils";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const pathname = request.nextUrl.pathname;

  // Check if the user is logged in
  if (session) {
    const parsed = await decrypt(session);

    if (!parsed) return NextResponse.next();

    // Check if the session is about to expire (e.g., within 2 minutes)
    const currentTime = Date.now();
    const expiresTime = new Date(parsed?.expires as Date).getTime();
    const timeUntilExpiration = expiresTime - currentTime;

    if (timeUntilExpiration < 120 * 1000) {
      // less than 2 minutes
      // Refresh the session
      parsed.expires = new Date(currentTime + 3600 * 1000); // Extend by another 2 minutes

      const res = NextResponse.next();
      res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires as Date,
      });

      // Redirect authenticated users trying to access login/signup
      if (["/sign-in", "/sign-up"].includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return res; // Return the updated response
    }

    // Redirect authenticated users trying to access login/signup
    if (["/sign-in", "/sign-up"].includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow the request to continue
    return NextResponse.next();
  }

  // Check if the user is not logged in and trying to access protected routes
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow the request to continue if no conditions are met
  return NextResponse.next();
}
