import React, { useEffect, useState } from "react";
//ui
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
//icon
import { MoreVertical } from "lucide-react";
import useFriendRequest from "@/store/chat/useFriendRequest";
import useDialogs from "@/store/dialogs/useDialogs";
import useAuth from "@/store/auth/useAuth";
import { IFriendRequest, IReceiveNotification } from "@/types";
import { toast } from "sonner";
import { useSocket } from "@/store/socket";

const ChatlistDropdown = () => {
    const { friendRequests, addNewFriendRequest} = useFriendRequest();
    const { toggleShowRequest, showRequests } = useDialogs();
    const { logout } = useAuth();
    const { socket } = useSocket();

    const newFriendRequest = friendRequests.filter(request => !request.isRead)

    useEffect(() => {
        if (socket) {
            socket.emit("notification:getAll", (allNotification: any) => {
                console.log("allNotification", allNotification);
            });

            socket.on("notification:received", (data: IReceiveNotification) => {
                const {
                    id,
                    content,
                    isRead,
                    metaData: { image, username, createAt },
                    type,
                } = data;

                const newReuqest: IFriendRequest = {
                    _id: id,
                    isRead: isRead,
                    status: "pending",
                    senderInfo: {
                        image,
                        username,
                    },
                    createdAt: createAt,
                };
                addNewFriendRequest(newReuqest);
                toast.info(`${content} from ${username}`);
            });
        }
    }, [showRequests]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    className="bg-primary-overlay shadow-none text-primary relative"
                >
                    {newFriendRequest.length > 0 && (
                        <div className="size-[5px] rounded-full absolute top-[-2px] right-[-2px] bg-red"></div>
                    )}

                    <MoreVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background border-gray-secondary">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:bg-gray-secondary cursor-pointer transition-colors">
                        Notifications
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="hover:bg-gray-secondary cursor-pointer transition-colors flex items-center justify-between"
                        onClick={toggleShowRequest}
                    >
                        Requests
                        {newFriendRequest.length > 0 && (
                            <Badge className="text-white bg-red">
                                {newFriendRequest.length}
                            </Badge>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="bg-red-overlay text-red cursor-pointer hover:bg-red hover:text-white rounded-md transition-all"
                    onClick={logout}
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ChatlistDropdown;
