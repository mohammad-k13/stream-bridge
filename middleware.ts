import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const { nextUrl } = req;

    if (nextUrl.pathname === "/auth/login") {
        return NextResponse.next();
    }

    if (nextUrl.pathname === "/chat") {
      //todoo make a check here for session Token
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }
}

export const config = {
    matcher: [
        "/",
        "/explore",
        "/my-packs/:path*",
        "/payments",
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
