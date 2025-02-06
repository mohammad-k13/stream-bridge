import { axiosClient } from "@/lib/axios";
import { getCookie } from "@/lib/cookies";
import { IFriend } from "@/types";
import { create } from "zustand";
import { useSocket } from "../socket";

export interface IUseFriendsList {
    selectedFriend: IFriend | null;
    friendsList: IFriend[];
    friendsListLoading: boolean;

    setFriendsNewMessage: (id: string) => void;
    setSelectedFriend: (friendinfo: IFriend) => void;
    getFriends: () => void;
    updateFriendsList: () => void;
}

const useFriendsList = create<IUseFriendsList>((set, get) => ({
    selectedFriend: null,

    friendsList: [],
    setSelectedFriend: (friendId) => set({ selectedFriend: friendId }),
    friendsListLoading: false,
    getFriends: async () => {
        set({ friendsListLoading: true });
        const { data, status } = await axiosClient<IFriend[]>("/all-friends");
        set({ friendsList: data, friendsListLoading: false });
    },
    updateFriendsList: () => {
        const socket = useSocket.getState().socket;

        if (socket) {
            socket.on("new-friends", (newFriends: IFriend[]) => {
                set({ friendsList: newFriends });
            });
        }
    },

    setFriendsNewMessage: (friendId: string) => {
        const friendIndex = get().friendsList.findIndex(({ _id }) => _id === friendId);
        if (friendIndex !== -1) {
            set((state) => {
                const updatedFriendsNewMessage = state.friendsList.map((friend, index) =>
                    index === friendIndex
                        ? {
                              ...friend,
                              hasNewMessage: true,
                              newMessageCount: friend.newMessageCount + 1,
                          }
                        : friend
                );

                return { friendsList: updatedFriendsNewMessage };
            });
        }
    },
}));

export default useFriendsList;
