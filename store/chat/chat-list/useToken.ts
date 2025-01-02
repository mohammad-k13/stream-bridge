import { create } from "zustand";
import Cookies from "js-cookie";

interface IUseToken {
      token: string,
      getToken: () => void;
}

const useToken = create<IUseToken>((set, get) => ({
      token: "",
      getToken: () => {
            const token = Cookies.get("sessionToken");
            set({token})
      }
}))

export default useToken;