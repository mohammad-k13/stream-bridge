"use client";

import { Button } from "@/components/ui/button";
import useChatListStore from "@/store/chat/chat-list/useChatListStore";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { PhoneCall, Send, Smile } from "lucide-react";
import { io } from "socket.io-client";
import { getCookie } from "@/lib/cookies";
import { IMessage } from "@/types";
import { redirect } from "next/dist/server/api-utils";
import { axiosClient } from "@/lib/axios";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    auth: {
        token: getCookie("sessionToken")?.toString(),
    },
});

const Page = ({ params }: { params: { chatId: string } }) => {
    const { selectedChat } = useChatListStore();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string | null>(null);

    const sendMessage = () => {
        socket.emit(
            "send-message",
            { message: newMessage, recieverId: selectedChat!._id },
            (text: string, senderId: string) => {
                const message: IMessage = { recieverId: selectedChat!._id, senderId, text };
                setMessages((pv) => [...pv, message]);
            }
        );
    };

    const inputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket server");
        });

        socket.emit("assign-user");
        socket.on("recive-message", async ({ message, recieverId, senderId }) => {
            const {
                data: { isMatch },
            } = await axiosClient.post("/matchUserIdWithToken", { userId: recieverId });
            console.log("isMatch", isMatch);
            if (!isMatch) {
                setMessages((prev) => [...prev, { text: message, recieverId, senderId }]);
            }
        });

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
                    <Image src={selectedChat.image} width={48} height={48} alt="profile-iamge" className="rounded-md" />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="font-semibold text-heading-4">{selectedChat.username}</h4>
                        <p className="text-gray text-caption">last seen recently</p>
                    </div>
                </div>
                <div>
                    <Button className="bg-red-overlay shadow-none text-red flex items-center gap-2 px-3">
                        <PhoneCall />
                        Call
                    </Button>
                </div>
            </header>
            <main className="h-full w-full">
                {messages.map(({ text, recieverId, senderId }, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-gray">
                        <p>{text}</p>
                        <p>senderId: {senderId}</p>
                        <p>recieverId: {recieverId}</p>
                    </div>
                ))}
            </main>
            <footer className="lg:w-2/3 w-full h-fit bg-white absolute z-30 left-1/2 -translate-x-1/2 bottom-0 rounded-lg">
                <form className="w-fill flex items-center gap-2 px-5 pb-5" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        placeholder="Type a message"
                        className="py-2 border-gray-secondary"
                        onChange={inputOnChangeHandler}
                    />
                    <Button size={"icon"} onClick={sendMessage}>
                        <Send />
                    </Button>
                </form>
            </footer>
        </section>
    );
};

export default Page;
