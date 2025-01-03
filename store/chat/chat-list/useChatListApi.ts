import { axiosClient } from "@/lib/axios";
import { IChat } from "@/types";
import { create } from "zustand";

export interface IUseChatListApi {
    chatList: IChat[];
    getChats: () => void;
}

const useChatListApi = create<IUseChatListApi>((set, get) => ({
    chatList: [],
    getChats: async () => {
        const { data, status } = await axiosClient<IChat[]>("/users");
        set({ chatList: data });
    },
}));

export default useChatListApi;
