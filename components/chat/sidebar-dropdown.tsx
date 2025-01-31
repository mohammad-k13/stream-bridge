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

const SidebarDropdown = () => {
    const { friendRequests, addNewFriendRequest, getFriendRequest} = useFriendRequest();
    const { toggleShowRequest, showRequests, toggleShowLoading} = useDialogs();
    const { logout } = useAuth();
    const { socket } = useSocket();

    const newFriendRequest = friendRequests.filter(request => request.status === 'pending')

    const openRequestListDialog = async () => {
        toggleShowLoading(); // showing loading ui unitl getting data
        getFriendRequest();
        toggleShowLoading(); // close loading ui
        toggleShowRequest(); // show request list dialog
    }
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
                        onClick={openRequestListDialog}
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

export default SidebarDropdown;
