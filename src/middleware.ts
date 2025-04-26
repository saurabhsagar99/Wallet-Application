import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { auth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const localtoken = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName: "authjs.session-token",
  });
  const prodtoken = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName: "__Secure-authjs.session-token",
  });
  if (localtoken || prodtoken) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/c/:path*"],
};
