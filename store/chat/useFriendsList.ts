import { axiosClient } from "@/lib/axios";
import { getCookie } from "@/lib/cookies";
import { IFriend } from "@/types";
import { create } from "zustand";
import { useSocket } from "../socket";

export interface IUseFriendsList {
    selectedFriend: IFriend | null;
    setSelectedFriend: (friendinfo: IFriend) => void;

    friendsList: IFriend[];
    friendsListLoading: boolean;
    getFriends: () => void;
    updateFriendsList: () => void;
}

const useFriendsList = create<IUseFriendsList>((set, get) => ({
    selectedFriend: null,
    setSelectedFriend: (friendId) => set({ selectedFriend: friendId }),

    friendsList: [],
    friendsListLoading: false,
    getFriends: async () => {
        set({ friendsListLoading: true });
        const { data, status } = await axiosClient<IFriend[]>("/all-friends");
        set({ friendsList: data, friendsListLoading: false });
    },
    updateFriendsList: () => {
        const socket = useSocket.getState().socket;

        if(socket) {
            socket.on("new-friends", (newFriends: IFriend[]) => {
                set({friendsList: newFriends})
            })
        }
    }
}));

export default useFriendsList;
