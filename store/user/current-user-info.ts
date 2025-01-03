import { axiosClient } from "@/lib/axios";
import { IUser } from "@/types";
import { create } from "zustand";

interface IUseCurrentUserInfo {
    userInfo: IUser | null;
    getThisUserInfo: () => void;
}

const useCurrentUserInfo = create<IUseCurrentUserInfo>((set, get) => ({
    userInfo: null,
    getThisUserInfo: async () => {
      const {data} = await axiosClient<IUser>("/thisUserInfo");
      set({userInfo: data})
    }
}));

export default useCurrentUserInfo