"use client";

import Image from "next/image";
import React, { useEffect, useTransition } from "react";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";
import { Input } from "../ui/input";
import ChatBox from "../ui/chat/chat-box";
import useChatListStore from "@/store/chat/chat-list/useChatListStore";
import useChatListApi from "@/store/chat/chat-list/useChatListApi";
import ChatboSkeletone from "../skeletons/chatbox-skeletone";
import useCurrentUserInfo from "@/store/user/current-user-info";
import { Skeleton } from "../ui/skeleton";

const ChatsList = () => {
    const { getChats, chatListLoading, chatList } = useChatListApi();
    const { getThisUserInfo, userInfo } = useCurrentUserInfo();

    useEffect(() => {
        getThisUserInfo();
        getChats();
    }, []);

    return (
        <>
            <div className="w-full p-2 px-4 h-14 border-b-[1px] border-gray-secondary flex items-center justify-between">
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
                                <p className="text-caption font-semibold text-gray">{userInfo?.email}</p>
                            </div>
                        </>
                    )}
                </div>
                <Button size="icon" className="bg-red-overlay shadow-none text-red">
                    <MoreVertical />
                </Button>
            </div>
            <div className="w-full h-full p-2 overflow-scroll flex flex-col items-center gap-3">
                <Input
                    placeholder="Search messages"
                    className="focus-visible:border-none bg-gray-secondary rounded-md p-2 border-none"
                />
                {chatListLoading && Array.from({ length: 5 }).map((_, index) => <ChatboSkeletone key={index} />)}
                {!chatListLoading &&
                    chatList.map(({ _id, image, username }, index) => (
                        <ChatBox key={_id} _id={_id} image={image} username={username} />
                    ))}
            </div>
        </>
    );
};

export default ChatsList;
