"use client";

import { IFriend } from "@/types";
import Image from "next/image";
import React from "react";
import { Badge } from "../badge";
import clsx from "clsx";
import useFriendsList from "@/store/chat/useFriendsList";
import { redirect, usePathname, useRouter } from "next/navigation";

interface Props extends IFriend {
    timestamp?: string;
}

const ChatBox = ({ _id, image, username, timestamp = "12m" }: Props) => {
    const { selectedChat, setSelectedChat } = useFriendsList();
    const isSelectedChat = selectedChat?.username === username;
    const pathname = usePathname().split("/")[2];


    const handleClick = () => {
        const chat = { _id, image, username };
        setSelectedChat(chat);
        redirect(`/chat/${pathname}/${_id}`)
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
                    src={image || "/fallback-image.png"}
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
                <p className="text-gray text-caption">{"what's up"}</p>
            </main>
        </article>
    );
};

export default ChatBox;