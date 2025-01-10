import { create } from "zustand";
import Cookies from "js-cookie";
import { deleteCookie } from "@/lib/cookies";
import { redirect } from "next/navigation";

interface IUseAuthe {
      token: string,
      setToken: (token: string) => void
      getToken: () => void;

      logout: () => void;
}

const useAuth = create<IUseAuthe>((set, get) => ({
      token: "",
      setToken: (token: string) => {
            set({token})
      },
      getToken: () => {
            const token = Cookies.get("sessionToken");
            set({token})
      },

      logout: async () => {
            deleteCookie("sessionToken");
            redirect("/");
      }
}))

export default useAuth ;