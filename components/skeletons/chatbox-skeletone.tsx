import React from "react";
import { Skeleton } from "../ui/skeleton";

const ChatboSkeletone = () => {
    return (
        <div className="w-full flex items-center space-x-4 bg-red-500 z-50">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="grow space-y-2">
                <div className="w-full flex justify-between items-center gap-3">
                    <Skeleton className="h-4 grow" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                </div>
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    );
};

export default ChatboSkeletone;
