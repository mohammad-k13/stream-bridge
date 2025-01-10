import FriendRequestDialog from "@/components/dialogs/friend-request";
import RequestListDialog from "@/components/dialogs/request-list";
import { Props } from "@/types";
import React from "react";

const DialogsProvider = ({ children }: Props) => {
    return (
        <>
            {children}
            <FriendRequestDialog />
            <RequestListDialog />
        </>
    );
};

export default DialogsProvider;
