import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sessionTokenValidation from "./lib/sessionTokenValidation";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const nextUrl = request.nextUrl;
    const pathname = nextUrl.pathname;

    const sessionToken = (await cookies()).get("sessionToken")?.value;
    const username = (await cookies()).get("username")?.value ?? "";

    if (pathname === "/chat") {
        if (!sessionToken) {
            return NextResponse.redirect(new URL("/login", nextUrl));
        } else {
            const sessionTokenValid = await sessionTokenValidation(username, sessionToken);
            if (!sessionTokenValid) {
                return NextResponse.redirect(new URL("/login", nextUrl));
            }
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
