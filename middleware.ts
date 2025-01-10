import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const sessionToken = req.cookies.get("sessionToken");

    if (nextUrl.pathname === "/auth/login") {
        return NextResponse.next();
    }

    if (nextUrl.pathname.startsWith("/chat")) {
        if (!sessionToken) {
            return NextResponse.redirect(new URL("/auth/login", nextUrl));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/explore",
        "/my-packs/:path*",
        "/payments",
        "/chat/:path*",
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
