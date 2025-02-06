"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { type Props } from "@/types";
import FriendsList from "@/components/chat/friends-list";
import {useSocket} from "@/store/socket";
import useNotification from "@/store/chat/useNotification";
import useMessage from "@/store/chat/useMessage";

const ChatLayout = ({ children }: Props) => {
    const { connectToSocket, disconnectSocket } = useSocket();
    const { subscribeToNotifications } = useNotification();
    const {subscribeToNewMessage} = useMessage();

    useEffect(() => {
        connectToSocket();
        subscribeToNotifications();
        subscribeToNewMessage();

        return () => {
            disconnectSocket();
        };
    }, []);

    return (
        <section className="w-full h-screen overflow-hidden flex">
            <aside className="w-1/3 lg:w-1/4 h-full relative border-r-[1px] border-gray-secondary">
                <FriendsList />
            </aside>
            <main className="w-3/4 h-full">{children}</main>
        </section>
    );
};

export default ChatLayout;
