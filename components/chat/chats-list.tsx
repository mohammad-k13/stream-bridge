"use client";

import Image from "next/image";
import React, { useEffect, useTransition } from "react";
import { Button } from "../ui/button";
import { MoreVertical, Plus } from "lucide-react";
import { Input } from "../ui/input";
import ChatBox from "../ui/chat/chat-box";
import useChatList from "@/store/chat/useChatList";
import ChatboSkeletone from "../skeletons/chatbox-skeletone";
import useCurrentUserInfo from "@/store/user/current-user-info";
import { Skeleton } from "../ui/skeleton";

import useAuth from "@/store/auth/useAuth";
import useDialogs from "@/store/dialogs/useDialogs";
import useFriendRequest from "@/store/chat/useFriendRequest";
import { Badge } from "../ui/badge";
import ChatlistDropdown from "./chatlist-dropdown";

const ChatsList = () => {
    const { getFriendRequest } = useFriendRequest();
    const { getChats, chatListLoading, chatList } = useChatList();
    const { getThisUserInfo, userInfo } = useCurrentUserInfo();
    const { toggleFriendDialog } = useDialogs();

    useEffect(() => {
        getThisUserInfo();
        getChats();
        getFriendRequest();
    }, []);

    return (
        <>
            <div className="w-full p-2 px-4 h-14 border-b-[1px] border-gray-secondary flex items-center justify-between gap-2">
                <div className="w-full flex items-start gap-3">
                    {!userInfo ? (
                        <div className="grow mr-3">
                            <ChatboSkeletone isCurrentUser />
                        </div>
                    ) : (
                        <>
                            <Image
                                src={userInfo!.image}
                                alt="Mohammad-profile"
                                width={44}
                                height={44}
                                className="object-cover rounded-lg"
                            />{" "}
                            <div>
                                <h5 className="text-body font-bold">{userInfo?.username}</h5>
                                <p className="text-caption font-semibold text-gray">
                                    {userInfo?.email}
                                </p>
                            </div>
                        </>
                    )}
                </div>
                <Button
                    size="icon"
                    className="bg-primary shadow-none text-white relative"
                    onClick={toggleFriendDialog}
                >
                    <Plus />
                </Button>
                <ChatlistDropdown />
            </div>
            <div className="w-full h-full p-2 overflow-scroll flex flex-col items-center gap-3">
                <Input
                    placeholder="Search messages"
                    className="focus-visible:border-none bg-gray-secondary rounded-md p-2 border-none"
                />
                {chatListLoading &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <ChatboSkeletone key={index} />
                    ))}
                {!chatListLoading &&
                    chatList.map(({ _id, image, username }, index) => (
                        <ChatBox key={_id} _id={_id} image={image} username={username} />
                    ))}
            </div>
        </>
    );
};

export default ChatsList;
