"use client";

import { IChat } from "@/types";
import Image from "next/image";
import React from "react";
import { Badge } from "../badge";
import clsx from "clsx";

interface Props extends IChat {}

const ChatBox = ({ lastMessage, online, profileUrl, username }: Props) => {
    return (
        <article className="w-full h-fit p-2 rounded-md flex items-start gap-3 hover:bg-gray-secondary transition-colors cursor-pointer">
            <header className="flex items-center">
                <Image src={profileUrl} alt={username + "-profile"} width={48} height={48} className="object-cover rounded-md" />
            </header>
            <main className="w-full flex flex-col items-start">
                <div className="w-full flex items-center justify-between">
                    <h5 className="font-semibold text-body">{username}</h5>
                    <p className="font-semibold text-caption text-gray">12m</p>
                </div>
                <p className="text-gray text-caption">{lastMessage}</p>
            </main>
        </article>
    );
};

export default ChatBox;
