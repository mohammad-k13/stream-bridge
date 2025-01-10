import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-contenxt";
import { Toaster } from "sonner";
import DialogsProvider from "@/providers/dialogs-provider";

export const metadata: Metadata = {
    title: "Stream Bridge",
    description: "A plartform for make life easier",
    icons: {
        icon: {
            url: "/logo.png",
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <DialogsProvider>{children}</DialogsProvider>
                </ThemeProvider>
                <Toaster closeButton richColors />
            </body>
        </html>
    );
}
