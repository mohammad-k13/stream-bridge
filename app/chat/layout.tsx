import ChatBox from "@/components/ui/chat/chat-box";
import { chatList } from "@/constant";
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const ChatLayout = ({ children }: Props) => {
    return (
        <section className="w-full h-screen overflow-hidden flex">
            <aside className="w-1/5 h-full relative border-r-[1px] border-gray-secondary">
                <header className="w-full h-[100px] border-b-[1px] border-gray-secondary"></header>
                <main className="w-full h-full p-6 overflow-scroll flex flex-col items-center gap-3">
                    {chatList.map(({lastMessage, online, profileUrl, username}) => (
                        <ChatBox lastMessage={lastMessage} online={online} profileUrl={profileUrl} username={username}/>
                    ))}
                </main>
            </aside>
            <main className="w-4/5 h-full">{children}</main>
        </section>
    );
};

export default ChatLayout;
