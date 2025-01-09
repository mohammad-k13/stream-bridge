"use client";

import React, { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Spin,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import Password from "antd/es/input/Password";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { useRouter } from "next/navigation";
import useToken from "antd/es/theme/useToken";
import Cookies from "js-cookie";
import Link from "next/link";
import OTP from "antd/es/input/OTP";

const LoginForm = () => {
  const {
    "1": { borderRadiusLG },
  } = useToken();

  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [inviteCode, setInviteCode] = useState<string>("");
  const { push } = useRouter();

  const onChange = (text: any) => {
    setInviteCode(text);
  };

  const onFinish = async (value: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: value.email,
          password: value.password,
          inviteCode,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setErrorMessage(message);
        setLoading(true);
        return;
      }

      const { url, sessionToken, sessionId, cookieConfig } =
        await response.json();
      const cookieOptions = {
        expires: new Date(cookieConfig.maxAge),
        domain: cookieConfig.domain,
        path: cookieConfig.path,
        sameSite: cookieConfig.sameSite,
      };
      Cookies.set("sessionToken", sessionToken, cookieOptions);
      Cookies.set("sessionId", sessionId, cookieOptions);

      push(url);
    } catch (err) {
      console.log(err);
      setErrorMessage("Faild To Fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content className="w-full h-full flex items-center justify-center flex-col gap-8">
      <header className="flex items-center justify-center flex-col text-center">
        <Title level={2}>Welcome back, ready to conquer the markets?</Title>
        <Text type="secondary">
          Ready to dive deeper into the world of financial markets? Continue
          where you left off and keep sharpening your skills with our engaging
          quizzes.
        </Text>
      </header>
      <Divider dashed className="max-md:!hidden">
        Form
      </Divider>
      <Form
        name="trigger"
        style={{ width: "100%" }}
        className="flex items-center justify-center flex-col"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <FormItem
          hasFeedback
          label="Email"
          name="email"
          validateTrigger="onBlur"
          className="w-full md:w-3/5"
          rules={[{ min: 3, type: "email", required: true }]}
        >
          <Input placeholder="Email..." type="email" variant="filled" />
        </FormItem>

        <FormItem
          hasFeedback
          label="Pssword"
          name="password"
          className="w-full md:w-3/5"
          validateTrigger="onBlur"
          rules={[{ min: 7, required: true }]}
        >
          <Password
            placeholder="Password..."
            type="password"
            variant="filled"
          />
        </FormItem>
        <Divider className="w-full md:w-3/5" variant="dashed">
          <Text type="secondary" className="text-sm">
            Do you have Invite Code
          </Text>
        </Divider>
        <FormItem className="w-full md:w-3/5" name="invite_code">
          <Flex className="w-full" justify="space-between" align="center">
            <Text>Invite Code</Text>
            <OTP onChange={onChange} />
          </Flex>
        </FormItem>
        <FormItem className="w-full md:w-3/5 mt-4">
          <Spin spinning={loading}>
            <Button
              type="primary"
              variant="filled"
              htmlType="submit"
              className="w-full font-bold !bg-[#d89614] border-none hover:bg-[#d8961470] text-white rounded-md transition-all"
            >
              {!loading ? "Submit" : "Submitting"}
            </Button>
          </Spin>
        </FormItem>
        <Flex vertical align="center">
          <Text className="text-sm" type="secondary">
            <Link href={"/register"}>Create Account</Link>
          </Text>
          <Text className="text-sm" type="secondary">
            <Link href={"/"}>Home</Link>
          </Text>
        </Flex>
      </Form>
      {errorMessage && (
        <Alert
          type="error"
          message={errorMessage}
          banner
          closable
          className="w-full md:w-3/5 text-red-500"
          style={{ borderRadius: borderRadiusLG }}
        />
      )}
    </Content>
  );
};

export default LoginForm;