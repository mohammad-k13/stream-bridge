import { create } from "zustand";

interface IUseMessage {
      messages: [],
      gettingMessageLoading: boolean;

      getAllMessages: () => void;
      sendMessage: (message: string) => void;
}

const useMessage = create((set, get) => ({}));

export default useMessage;