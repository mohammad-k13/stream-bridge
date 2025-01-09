import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import ThemeProvider from "@/providers/theme-provider";

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <body style={{ padding: 0, margin: 0, boxSizing: "border-box"}}>
            <AntdRegistry>
                <ThemeProvider>{children}</ThemeProvider>
            </AntdRegistry>
        </body>
    </html>
);

export default RootLayout;
