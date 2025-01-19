import { axiosClient } from "@/lib/axios";
import { IChat, IFriendRequest, IReceiveNotification } from "@/types";
import { Socket } from "socket.io-client";
import { create } from "zustand";
import { useSocket } from "../socket";
import { toast } from "sonner";

interface IUseFriendRequest {
    friendRequests: IFriendRequest[];
    newFriendRequest: IFriendRequest[];
    getFriendRequest: () => void;
    addNewFriendRequest: (request: IFriendRequest) => void;
}

const useFriendRequest = create<IUseFriendRequest>((set, get) => ({
    friendRequests: [],
    newFriendRequest: [],
    getFriendRequest: async () => {
        const { data } = await axiosClient<IFriendRequest[]>("/all-friend-request");
        set({ friendRequests: data });
    },
    addNewFriendRequest: (newRequest) => {
        set((state) => ({ friendRequests: [...state.friendRequests, newRequest] }));
    },
}));

export default useFriendRequest;
