"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { axiosClient } from "@/lib/axios";
import useDialogs from "@/store/dialogs/useDialogs";
import { ChangeEvent, useCallback, useEffect, useState, useTransition } from "react";
import debounce from "lodash/debounce";
import Image from "next/image";
import clsx from "clsx";
import { Skeleton } from "../ui/skeleton";
import Empty from "../icons/Empty";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface SearchedUser {
    username: string;
    image: string;
}

const FriendRequestDialog = () => {
    const { showFriendDialog, toggleFriendDialog } = useDialogs();
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState<SearchedUser[]>([]);
    const [selectedUser, setselectedUser] = useState<string>("");

    const [sendingRequest, startSendRequest] = useTransition();

    const fetchUser = async (username: string) => {
        try {
            setLoading(true);
            const { data } = await axiosClient<SearchedUser[]>(`/users`, {
                params: { username },
            });
            setSearchResult(data);
        } catch (error) {
            console.error("Error fetching user:", error);
            setSearchResult([]);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchUser = debounce((value: string) => {
        const username = value.startsWith("@") ? value.slice(1) : value;
        fetchUser(username);
    }, 500);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedFetchUser(event.target.value);
    };

    const addUser = (username: string) => {
        setselectedUser(username);
    };

    const sendRequest = () => {
        startSendRequest(async () => {
            const body = { reciever_username: selectedUser };
            const {
                data: { message },
            } = await axiosClient.post("/friend-request", body);
            toast.success(message);
            toggleFriendDialog();
        });
    };

    return (
        <Dialog open={showFriendDialog} onOpenChange={toggleFriendDialog}>
            <DialogContent className="sm:max-w-[425px] h-[400px] border-gray-secondary bg-white flex flex-col justify-start">
                <DialogHeader>
                    <DialogTitle>Send Friend Request</DialogTitle>
                    <DialogDescription>Send a connection request to collaborate seamlessly.</DialogDescription>
                </DialogHeader>
                <Input placeholder="@username" onChange={onChangeHandler} />
                {loading && <Skeleton className="w-full py-4 rounded-md" />}
                {!loading && searchResult.length === 0 && <Empty title="User Not Found" />}
                <div className="w-full h-[340px] overflow-y-auto flex items-start justify-center flex-wrap gap-2">
                    {!loading &&
                        searchResult.length !== 0 &&
                        searchResult &&
                        searchResult.map(({ username, image }, index) => (
                            <div
                            key={index}
                                className={clsx(
                                    "flex-1 flex items-center gap-2 px-2 py-1 hover:bg-gray-secondary border-[1px] border-gray-secondary transition-colors rounded-md cursor-pointer",
                                    { "bg-primary-overlay border-primary": selectedUser.includes(username) }
                                )}
                                onClick={() => addUser(username)}
                            >
                                <Image src={image} alt="profile" width={35} height={35} className="rounded-md" />
                                <p className="text-body">{username}</p>
                            </div>
                        ))}
                </div>
                <DialogFooter>
                    <Button type="submit" disabled={loading || !searchResult || !selectedUser} onClick={sendRequest}>
                        {sendingRequest ? <Loader2 className="animate-spin" /> : "Send Request"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default FriendRequestDialog;
