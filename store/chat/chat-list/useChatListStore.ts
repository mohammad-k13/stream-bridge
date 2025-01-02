import { axiosInstance } from "@/lib/axios";
import { getCookie } from "@/lib/cookies";
import useToken from "@/store/auth/useToken";
import { IChat } from "@/types";
import { create } from "zustand";

export interface IUseChatListStore {
    chatList: IChat[];
    selectedChat: IChat | null;
    setSelectedChat: (chat: IChat) => void;
    getChats: () => void;
}

const useChatListStore = create<IUseChatListStore>((set, get) => ({
    chatList: [],
    selectedChat: null,
    setSelectedChat: (chat) => set({ selectedChat: chat }),
    getChats: async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users`, {
                headers: {
                    Authorization: "Bearer " + getCookie("sessionToken"),
                },
            });

            if (response.status === 403) {
                //logout
            }

            
        } catch (error) {
            console.log("fetch error", error);
        }
    },
}));

export default useChatListStore;
