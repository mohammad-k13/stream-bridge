"use client";

import { IChat } from "@/types";
import Image from "next/image";
import React from "react";
import { Badge } from "../badge";
import clsx from "clsx";
import useChatListStore from "@/store/chat/chat-list/useChatListStore";

interface Props extends IChat {
    timestamp?: string;
}

const ChatBox = ({ lastMessage, online, profileUrl, username, timestamp = "12m" }: Props) => {
    const { selectedChat, setSelectedChat } = useChatListStore();
    const isSelectedChat = selectedChat?.username === username;

    const handleClick = () => {
        const chat = { lastMessage, online, profileUrl, username };
        setSelectedChat(chat);
    };

    return (
        <article
            role="button"
            tabIndex={0}
            className={clsx(
                "w-full h-fit p-2 rounded-md flex items-start gap-3 hover:bg-gray-secondary transition-colors cursor-pointer",
                { "bg-gray-secondary": isSelectedChat }
            )}
            onClick={handleClick}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
        >
            <header className="flex items-center">
                <Image
                    src={profileUrl || "/fallback-image.png"}
                    alt={`${username}-profile`}
                    width={48}
                    height={48}
                    className="object-cover rounded-md"
                />
            </header>
            <main className="w-full flex flex-col items-start">
                <div className="w-full flex items-center justify-between">
                    <h5 className="font-semibold text-body">{username}</h5>
                    <p className="font-semibold text-caption text-gray">{timestamp}</p>
                </div>
                <p className="text-gray text-caption">{lastMessage}</p>
            </main>
        </article>
    );
};

export default ChatBox;