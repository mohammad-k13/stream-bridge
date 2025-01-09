"use client";

import { Props } from "@/types";
import { Button, ConfigProvider, Layout, Space, theme } from "antd";
import useToken from "antd/es/theme/useToken";
import React from "react";

const ThemeProvider = ({ children }: Props) => {
    const {
        "1": { colorBgBase },
    } = useToken();
    return (
        <ConfigProvider>
            <Layout
                style={{
                    minHeight: "100dvh",
                    width: "100%",
                }}
            >
                {children}
            </Layout>
        </ConfigProvider>
    );
};

export default ThemeProvider;
