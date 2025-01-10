import FriendRequestDialog from "@/components/dialogs/friend-request";
import { Props } from "@/types";
import React from "react";

const DialogsProvider = ({ children }: Props) => {
    return (
        <>
            {children}
            <FriendRequestDialog />
        </>
    );
};

export default DialogsProvider;
