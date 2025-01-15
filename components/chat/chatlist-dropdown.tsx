import React, { useEffect } from "react";
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
import { useSocket } from "@/providers/socket-provider";

const ChatlistDropdown = () => {
    const { newFriendRequest } = useFriendRequest();
    const { toggleShowRequest } = useDialogs();
    const { logout } = useAuth();
    const { socket } = useSocket();

    useEffect(() => {
        if(socket){
            socket.emit("notification:getAll", (allNotification: any) => {
                console.log("allNotification", allNotification);
            });
        }
    }, [socket]);

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
