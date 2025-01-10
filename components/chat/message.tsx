import { IMessage } from "@/types";
import clsx from "clsx";
import React from "react";

interface Props {
      type: IMessage['type'],
      text: IMessage['text']
}

const Message = ({ text, type }: Props) => {
    return (
        <div
            className={clsx("w-fit max-w-3/5 text-wrap h-fit py-2 px-3 rounded-md", {
                "bg-gray-secondary text-black justify-self-start": type === "in_box",
                "bg-primary text-white justify-self-end": type !== "in_box",
            })}
        >
            {text}
        </div>
    );
};

export default Message;
