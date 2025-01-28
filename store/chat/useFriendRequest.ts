import { axiosClient } from "@/lib/axios";
import {  IFriendRequest } from "@/types";
import { create } from "zustand";

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
