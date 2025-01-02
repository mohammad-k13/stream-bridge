"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";
import { Input } from "../ui/input";
import { chatList } from "@/constant";
import ChatBox from "../ui/chat/chat-box";
import useChatListStore from "@/store/chat/chat-list/useChatListStore";

const ChatsList = () => {
    const { getChats } = useChatListStore();

    useEffect(() => {
        getChats();
    }, []);

    return (
        <>
            <div className="w-full p-2 px-4 h-14 border-b-[1px] border-gray-secondary flex items-center justify-between">
                <div className="flex items-start gap-3">
                    <Image
                        src="https://avatars.githubusercontent.com/u/88265699?v=4"
                        alt="Mohammad-profile"
                        width={44}
                        height={44}
                        className="object-cover rounded-lg"
                    />
                    <div>
                        <h5 className="text-body font-bold">Mohammad</h5>
                        <p className="text-caption font-semibold text-gray">mohammad-k13</p>
                    </div>
                </div>
                <Button size="icon">
                    <MoreVertical />
                </Button>
            </div>
            <div className="w-full h-full p-2 overflow-scroll flex flex-col items-center gap-3">
                <Input
                    placeholder="Search messages"
                    className="focus-visible:border-none bg-gray-secondary rounded-md p-2 border-none"
                />
                {chatList.map(({ lastMessage, online, profileUrl, username }, index) => (
                    <ChatBox
                        key={index}
                        lastMessage={lastMessage}
                        online={online}
                        profileUrl={profileUrl}
                        username={username}
                    />
                ))}
            </div>
        </>
    );
};

export default ChatsList;
