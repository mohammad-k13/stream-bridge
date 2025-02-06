import React from "react";
import { Skeleton } from "../ui/skeleton";
import clsx from "clsx";

const MessageBoxSkeletone = ({type}: {type: "in_box" | "out_box"}) => {
      const randomWidth = Math.floor(Math.random() * (50 - 90 + 1)) + 50;
    return (
        <Skeleton
            className={clsx(`w-[${randomWidth}] max-w-3/5 text-wrap h-[40px] py-2 px-3 rounded-md`, {
                "justify-self-start": type === "in_box",
                "justify-self-end": type !== "in_box",
            })}
        />
    );
};

export default MessageBoxSkeletone;
