import FriendRequestDialog from "@/components/dialogs/friend-request";
import LoadingDialog from "@/components/dialogs/loading";
import RequestListDialog from "@/components/dialogs/request-list";
import { Props } from "@/types";
import React from "react";

const DialogsProvider = ({ children }: Props) => {
    return (
        <>
            {children}
            <FriendRequestDialog />
            <RequestListDialog />
            <LoadingDialog />
        </>
    );
};

export default DialogsProvider;
