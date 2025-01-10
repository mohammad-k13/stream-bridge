import { getCookie } from "@/lib/cookies";
import { IChat } from "@/types";
import { create } from "zustand";

export interface IUseChatListStore {
    selectedChat: IChat | null;
    setSelectedChat: (chat: IChat) => void;
}

const useChatListStore = create<IUseChatListStore>((set, get) => ({
    selectedChat: null,
    setSelectedChat: (chat) => set({ selectedChat: chat }),
}));

export default useChatListStore;
