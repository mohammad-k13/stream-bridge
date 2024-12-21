import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ChatLayout = ({ children }: Props) => {
  return <section className="w-full h-screen overflow-hidden">{children}</section>;
};

export default ChatLayout;
