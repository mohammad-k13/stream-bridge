"use client";

import { IChat } from "@/types";
import Image from "next/image";
import React from "react";

interface Props extends IChat {}

const ChatBox = ({ lastMessage, online, profileUrl, username }: Props) => {
    return (
        <article className="w-full h-[75px] flex items-start gap-3">
            <header className="flex items-center">
                <Image src={profileUrl} alt={username + "-profile"} width={48} height={48} className="object-cover" />
            </header>
        </article>
    );
};

export default ChatBox;
