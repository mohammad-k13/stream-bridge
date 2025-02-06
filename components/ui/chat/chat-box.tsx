"use client";

import { IFriend } from "@/types";
import Image from "next/image";
import React from "react";
import { Badge } from "../badge";
import clsx from "clsx";
import useFriendsList from "@/store/chat/useFriendsList";
import { redirect, usePathname, useRouter } from "next/navigation";
import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from "../context-menu";
import { ContextMenuContent } from "@radix-ui/react-context-menu";
import { Button } from "../button";
import ChatboSkeletone from "@/components/skeletons/chatbox-skeletone";

interface Props extends IFriend {
    timestamp?: string;
}

const ChatBox = ({
    _id,
    image,
    username,
    hasNewMessage,
    newMessageCount,
    timestamp = "12m",
}: Props) => {
    const { selectedFriend, setSelectedFriend } = useFriendsList();
    const isselectedFriend = selectedFriend?.username === username;
    const pathname = usePathname().split("/")[2];

    const handleClick = () => {
        const chat: IFriend = {
            _id,
            image,
            username,
            hasNewMessage: false,
            newMessageCount: 0,
        };
        setSelectedFriend(chat);
        redirect(`/chat/${pathname}/${_id}`);
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger
                className={clsx(
                    "w-full h-fit p-2 rounded-md flex items-start gap-3 hover:bg-gray-secondary transition-colors cursor-pointer",
                    { "bg-gray-secondary": isselectedFriend }
                )}
                onClick={handleClick}
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
                <main className="w-full flex flex-col items-start relative">
                    <div className="w-full flex items-center justify-between">
                        <h5 className="font-semibold text-body">{username}</h5>
                        <p className="font-semibold text-caption text-gray">{timestamp}</p>
                    </div>
                    {hasNewMessage && (
                        <div className="text-gray text-caption w-full relative flex items-center justify-between">
                            <p>New Message</p>
                            <div className="size-[8px] bg-red rounded-full" />
                        </div>
                    )}
                </main>
            </ContextMenuTrigger>
            <ContextMenuContent className="bg-white p-2 rounded-md flex flex-col gap-2">
                <ContextMenuItem className="hover:bg-gray-secondary transition-colors rounded-md cursor-pointer">
                    Remove Friend
                </ContextMenuItem>
                <ContextMenuItem className="hover:bg-gray-secondary transition-colors rounded-md cursor-pointer">
                    Remove Chat
                </ContextMenuItem>
                <ContextMenuItem className="bg-red-overlay text-red hover:bg-red hover:text-white transition-colors rounded-md cursor-pointer">
                    Block
                </ContextMenuItem>
            </ContextMenuContent>{" "}
        </ContextMenu>
    );
};

export default ChatBox;
