"use client";

import { Button } from "@/components/ui/button";
import useChatListStore from "@/store/chat/chat-list/useChatListStore";
import Image from "next/image";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Send, Smile } from "lucide-react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

const Page = ({params}: {params: {chatId: string}}) => {
    const { selectedChat } = useChatListStore();

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket server");
        });

        socket.on("connect_error", (error) => {
            console.error("Connection error:", error);
        });

        // Clean up the listener when the component unmounts
        return () => {
            socket.off("connect");
            socket.off("connect_error");
        };
    }, []);

    if (!selectedChat) return <p>Page</p>;
    return (
        <section className="w-full h-full relative">
            <header className="w-full h-14 flex items-center justify-between p-2 border-b-[1px] border-gray-secondary bg-white">
                <div className="flex items-start justify-center gap-5">
                    <Image src={selectedChat.profileUrl} width={48} height={48} alt="profile-iamge" />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="font-semibold text-heading-4">{selectedChat.username}</h4>
                        <p className="text-gray text-caption">last seen recently</p>
                    </div>
                </div>
            </header>
            <main className="h-full w-full"></main>
            <footer className="w-2/3 h-fit bg-white absolute z-30 left-1/2 -translate-x-1/2 bottom-0 rounded-lg">
                <form className="w-fill flex items-center gap-2 px-5 pb-5" onSubmit={(e) => e.preventDefault()}>
                    <Smile />
                    <Input placeholder="Type a message" className="py-2 border-gray-secondary" />
                    <Button size={"icon"} onClick={() => alert("send")}>
                        <Send />
                    </Button>
                </form>
            </footer>
        </section>
    );
};

export default Page;
