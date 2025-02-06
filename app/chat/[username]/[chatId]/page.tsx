"use client";

import { Button } from "@/components/ui/button";
import useFriendsList from "@/store/chat/useFriendsList";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { PhoneCall, Send, SkipBack, Smile } from "lucide-react";
import Message from "@/components/chat/message";
import { useSocket } from "@/store/socket";
import useMessage from "@/store/chat/useMessage";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/cookies";
import MessageBoxSkeletone from "@/components/skeletons/message-box-skeletone";

const Page = () => {
    const { push } = useRouter();
    const { socket } = useSocket();
    const { selectedFriend } = useFriendsList();
    const { sendMessage, messages, clearMessages, getAllMessages, gettingMessageLoading } =
        useMessage();

    const [newMessage, setNewMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedFriend) {
            backRoute();
            return;
        }

        getAllMessages(selectedFriend._id);
        return () => {
            clearMessages();
        };
    }, []);

    const inputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };

    const sendMessageHandler = () => {
        if (newMessage && selectedFriend) {
            sendMessage(newMessage, selectedFriend._id);
            setNewMessage(null);
        }
    };

    const backRoute = () => {
        const username = getCookie("username");
        if (!username) {
            push("/auth/login");
            return;
        }

        push(`/chat/${username}`);
    };

    return (
        <section className="w-full h-full relative">
            <header className="w-full h-14 flex items-center justify-between p-2 border-b-[1px] border-gray-secondary bg-white">
                <div className="flex items-start justify-center gap-5">
                    <Image
                        src={selectedFriend?.image || ""}
                        width={48}
                        height={48}
                        alt="profile-iamge"
                        className="rounded-md"
                    />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="font-semibold text-heading-4">
                            {selectedFriend?.username}
                        </h4>
                        <p className="text-gray text-caption">last seen recently</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button className="bg-primary-overlay shadow-none text-primary flex items-center gap-2 px-3">
                        <PhoneCall />
                        Call
                    </Button>
                    <Button
                        className="bg-primary-overlay shadow-none text-primary flex items-center gap-2 px-3"
                        onClick={backRoute}
                    >
                        Back
                    </Button>
                </div>
            </header>
            <main
                className="w-full p-2 overflow-auto"
                style={{
                    height: "calc(100% - 3.5rem - 3.5rem)",
                }}
            >
                {gettingMessageLoading && Array.from({length: 23}).map((_, index) => <MessageBoxSkeletone key={index} type={index % 2 == 0 ? "in_box" : "out_box"}/>)}
                {messages.map(({ text, type, createdAt }, index) => (
                    <Message key={index} text={text} type={type} createdAt={createdAt} />
                ))}
            </main>
            <footer className="lg:w-2/3 w-full h-fit bg-white absolute z-30 left-1/2 -translate-x-1/2 bottom-0 rounded-lg">
                <form
                    className="w-fill flex items-center gap-2 px-5 pb-5"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <Input
                        placeholder="Type a message"
                        className="py-2 border-gray-secondary"
                        value={newMessage || ""}
                        onChange={inputOnChangeHandler}
                    />
                    <Button size={"icon"} disabled={!newMessage} onClick={sendMessageHandler}>
                        <Send />
                    </Button>
                </form>
            </footer>
        </section>
    );
};

export default Page;
