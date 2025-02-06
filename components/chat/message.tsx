import { IMessage } from "@/types";
import clsx from "clsx";
import React from "react";

interface Props {
    type: IMessage["type"];
    text: IMessage["text"];
    createdAt: IMessage["createdAt"];
}

const Message = ({ text, type, createdAt }: Props) => {
    return (
        <div
            className={clsx(
                "w-fit max-w-3/5 text-wrap h-fit py-1 px-3 rounded-md flex flex-col my-1",
                {
                    "bg-gray-secondary text-black justify-self-start": type === "in_box",
                    "bg-primary text-white justify-self-end": type !== "in_box",
                }
            )}
        >
            {text}
            <p className="text-caption text-gray">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default Message;
