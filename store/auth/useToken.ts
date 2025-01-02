import { create } from "zustand";
import Cookies from "js-cookie";

interface IUseToken {
      token: string,
      setToken: (token: string) => void
      getToken: () => void;
}

const useToken = create<IUseToken>((set, get) => ({
      token: "",
      setToken: (token: string) => {
            set({token})
      },
      getToken: () => {
            const token = Cookies.get("sessionToken");
            set({token})
      }
}))

export default useToken;