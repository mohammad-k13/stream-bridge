import { axiosInstance } from "@/lib/axios";
import { IChat } from "@/types";
import { create } from "zustand";

export interface IUseChatListStore {
    selectedChat: IChat | null;
    setSelectedChat: (chat: IChat) => void;
    getChats: () => void;
}

const useChatListStore = create<IUseChatListStore>((set, get) => ({
    selectedChat: null,
    setSelectedChat: (chat) => set({ selectedChat: chat }),
    getChats: () => {
        axiosInstance.get(`${process.env.API}/users`)
    }
}));

export default useChatListStore;
