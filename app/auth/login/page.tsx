"use client";

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import useToken from "antd/es/theme/useToken";
import React from "react";
// import LoginSvg from "@/public/login.svg";
import Image from "next/image";
import LoginForm from "@/components/forms/loginForm";

const Login = () => {
  const {
    "1": { borderRadiusLG, colorBgBase },
  } = useToken();
  return (
    <Layout
      className="w-full flex items-center justify-center p-[12px] gap-[12px] !flex-row max-md:!flex-col-reverse max-md:gap-y-9 max-md:!h-fit"
      style={{ height: "calc(100vh - 24px)", backgroundColor: colorBgBase }}
    >
      <Content className="w-[40%] h-full max-md:w-full flex items-center justify-center flex-col">
        <LoginForm />
      </Content>
      <Content
        className="w-[60%] h-full max-md:w-full flex items-center justify-center"
        style={{ borderRadius: borderRadiusLG, backgroundColor: "#f5f5f5" }}
      >
        {/* <Image src={"LoginSvg"} alt="login-svg" width={397} height={450} /> */}
      </Content>
    </Layout>
  );
};

export default Login;