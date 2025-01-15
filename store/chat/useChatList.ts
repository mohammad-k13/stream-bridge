import { axiosClient } from "@/lib/axios";
import { getCookie } from "@/lib/cookies";
import { IChat } from "@/types";
import { create } from "zustand";

export interface IuseChatList {
    selectedChat: IChat | null;
    setSelectedChat: (chat: IChat) => void;

    chatList: IChat[];
    chatListLoading: boolean,
    getChats: () => void;
}

const useChatList = create<IuseChatList>((set, get) => ({
    selectedChat: null,
    setSelectedChat: (chat) => set({ selectedChat: chat }),

    chatList: [],
    chatListLoading: false,
    getChats: async () => {
      set({chatListLoading: true})
        const { data, status } = await axiosClient<IChat[]>("/all-friends");
        set({ chatList: data, chatListLoading: false});
    },
}));

export default useChatList;
