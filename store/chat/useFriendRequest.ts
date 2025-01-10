import { axiosClient } from "@/lib/axios";
import { IChat, IFriendRequest } from "@/types";
import { create } from "zustand";

interface IUseFriendRequest {
    friendRequests: IFriendRequest[];
    newFriendRequest: IFriendRequest[];
    getFriendRequest: () => void;
}

const useFriendRequest = create<IUseFriendRequest>((set, get) => ({
    friendRequests: [],
    newFriendRequest: [],
    getFriendRequest: async () => {
        const { data } = await axiosClient<IFriendRequest[]>("/all-friend-request");
        set({ friendRequests: data, newFriendRequest: data.filter((request) => request.status === "pending") });
    },
}));

export default useFriendRequest;
