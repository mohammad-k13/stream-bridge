"use client";

import Image from "next/image";
import React, { useEffect, useTransition } from "react";
import { Button } from "../ui/button";
import { MoreVertical, Plus } from "lucide-react";
import { Input } from "../ui/input";
import ChatBox from "../ui/chat/chat-box";
import useChatListStore from "@/store/chat/chat-list/useChatListStore";
import useChatListApi from "@/store/chat/chat-list/useChatListApi";
import ChatboSkeletone from "../skeletons/chatbox-skeletone";
import useCurrentUserInfo from "@/store/user/current-user-info";
import { Skeleton } from "../ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/store/auth/useAuth";
import useDialogs from "@/store/dialogs/useDialogs";

const ChatsList = () => {
    const { getChats, chatListLoading, chatList } = useChatListApi();
    const { getThisUserInfo, userInfo } = useCurrentUserInfo();
    const { logout } = useAuth();
    const { toggleFriendDialog } = useDialogs();

    useEffect(() => {
        getThisUserInfo();
        getChats();
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
                                <p className="text-caption font-semibold text-gray">{userInfo?.email}</p>
                            </div>
                        </>
                    )}
                </div>
                <Button size="icon" className="bg-primary shadow-none text-white" onClick={toggleFriendDialog}>
                    <Plus />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" className="bg-primary-overlay shadow-none text-primary">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-background border-gray-secondary">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="hover:bg-gray-secondary cursor-pointer transition-colors">
                                Notifications
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-secondary cursor-pointer transition-colors">
                                Requests
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="bg-red-overlay text-red cursor-pointer hover:bg-red hover:text-white rounded-md transition-all"
                            onClick={logout}
                        >
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
