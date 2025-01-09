import { Props } from "@/types";
import { Flex, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

const AuthLayout = ({ children }: Props) => {
    return (
        <Layout style={{backgroundColor: "#fff"}}>
            <Content style={{backgroundColor: "#fff"}}>{children}</Content>
        </Layout>
    );
};

export default AuthLayout;
