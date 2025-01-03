import { axiosClient } from "@/lib/axios";
import { IChat } from "@/types";
import { create } from "zustand";

export interface IUseChatListApi {
    chatList: IChat[];
    chatListLoading: boolean,
    getChats: () => void;
}

const useChatListApi = create<IUseChatListApi>((set, get) => ({
    chatList: [],
    chatListLoading: false,
    getChats: async () => {
      set({chatListLoading: true})
        const { data, status } = await axiosClient<IChat[]>("/users");
        set({ chatList: data, chatListLoading: false});
    },
}));

export default useChatListApi;
