"use client";

import useChatListStore from "@/store/chat/chat-list/useChatListStore";
import Image from "next/image";
import React from "react";

const Page = () => {
    const { selectedChat } = useChatListStore();
    if (!selectedChat) return <p>Page</p>;

    return (
        <section className="w-full h-full">
            <header className="w-full h-14 flex items-center justify-between p-2 border-b-[1px] border-gray-secondary">
                <div className="flex items-start justify-center gap-5">
                    <Image src={selectedChat.profileUrl} width={48} height={48} alt="profile-iamge" />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="font-semibold text-heading-4">{selectedChat.username}</h4>
                        <p className="text-gray text-caption">last seen recently</p>
                    </div>
                </div>
            </header>
        </section>
    );
};

export default Page;
