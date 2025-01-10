"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { axiosClient } from "@/lib/axios";
import useChatListApi from "@/store/chat/chat-list/useChatListApi";
import useFriendRequest from "@/store/chat/useFriendRequest";
import useDialogs from "@/store/dialogs/useDialogs";
import { IFriendRequest } from "@/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

const RequestListDialog = () => {
    const { showRequests, toggleShowRequest } = useDialogs();
    const { friendRequests } = useFriendRequest();
    const { getChats } = useChatListApi();
    const [loadingRequest, setLoadingRequest] = useState<{
        id: string | null;
        action: "accept" | "reject" | null;
    }>({ id: null, action: null });

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.toLocaleString("default", { month: "short" });
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}/${month}/${day}`;
    };

    const answerToRequest = async ({
        newStatus,
        request_id,
        username,
        action,
    }: {
        username: string;
        request_id: string;
        newStatus: IFriendRequest["status"];
        action: "accept" | "reject";
    }) => {
        setLoadingRequest({ id: request_id, action });
        const body = {
            newStatus,
            request_id,
            username,
        };
        const {
            data: { message },
        } = await axiosClient.post("/answer-to-request", body);
        toast.success(message);
        getChats();
        setLoadingRequest({ id: null, action: null });
        toggleShowRequest();
    };

    return (
        <Dialog open={showRequests} onOpenChange={toggleShowRequest}>
            <DialogContent className="sm:max-w-[425px] h-[400px] bg-white border-gray-secondary flex items-center justify-start flex-col">
                <DialogHeader className="w-full">
                    <DialogTitle>Friend Requests</DialogTitle>
                    <DialogDescription>View and manage your incoming friend requests</DialogDescription>
                </DialogHeader>
                <div className="w-full grid gap-4 py-4">
                    {friendRequests.map((item) => (
                        <div
                            key={item._id}
                            className="w-full h-full py-1 px-2 rounded-md flex items-center justify-between border-gray-secondary"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Image
                                    src={item.senderInfo.image}
                                    alt="sender-profile"
                                    width={35}
                                    height={35}
                                    className="rounded-md"
                                />
                                <div className="flex items-start justify-start flex-col">
                                    <p className="text-body">{item.senderInfo.username}</p>
                                    <p className="text-gray text-caption">{formatDate(item.createdAt)}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                {item.status === "pending" ? (
                                    <>
                                        <Button
                                            variant={"ghost"}
                                            className="bg-background text-primary hover:bg-primary-overlay transition-colors"
                                            onClick={() =>
                                                answerToRequest({
                                                    newStatus: "accepted",
                                                    request_id: item._id,
                                                    username: item.senderInfo.username,
                                                    action: "accept",
                                                })
                                            }
                                            disabled={
                                                loadingRequest.id === item._id && loadingRequest.action === "accept"
                                            }
                                        >
                                            {loadingRequest.id === item._id && loadingRequest.action === "accept" ? (
                                                <Loader2 className="animate-spin" />
                                            ) : (
                                                "Accept"
                                            )}
                                        </Button>
                                        <Button
                                            variant={"ghost"}
                                            className="bg-red-overlay text-red hover:text-white hover:bg-red transition-colors"
                                            onClick={() =>
                                                answerToRequest({
                                                    newStatus: "rejected",
                                                    request_id: item._id,
                                                    username: item.senderInfo.username,
                                                    action: "reject",
                                                })
                                            }
                                            disabled={
                                                loadingRequest.id === item._id && loadingRequest.action === "reject"
                                            }
                                        >
                                            {loadingRequest.id === item._id && loadingRequest.action === "reject" ? (
                                                <Loader2 className="animate-spin" />
                                            ) : (
                                                "Reject"
                                            )}
                                        </Button>
                                    </>
                                ) : item.status === "accepted" ? (
                                    <Badge variant={"default"} className="text-white">Accepted</Badge>
                                ) : (
                                    <Badge variant={"default"} className="text-white">Rejected</Badge>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RequestListDialog;
