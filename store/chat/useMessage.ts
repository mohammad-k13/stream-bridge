import { IMessage } from "@/types";
import { create } from "zustand";
import { useSocket } from "../socket";
import { toast } from "sonner";

interface IUseMessage {
    messages: IMessage[];
    gettingMessageLoading: boolean;
    sendingMessageLoading: boolean;

    getAllMessages: (selectedFriendId: string) => void;
    sendMessage: (message: string, recieverId: string) => void;
    getNewMessage: () => void;
    clearMessages: () => void;
}

const useMessage = create<IUseMessage>((set, get) => ({
    messages: [],
    gettingMessageLoading: false,
    sendingMessageLoading: false,

    getAllMessages: () => {},
    sendMessage: (message, recieverId) => {
        set({ sendingMessageLoading: true });

        const socket = useSocket.getState().socket;
        if (socket) {
            socket.emit(
                "send-message",
                {
                    message,
                    recieverId,
                },
                //this callback fire when message has been created in db successfully
                (text: string, id: string) => {
                    const outBoxMessage: IMessage = { text, type: "out_box", id };
                    set(({ messages }) => ({
                        messages: [...messages, outBoxMessage],
                        sendingMessageLoading: false,
                    }));
                },
            );
        }
    },
    getNewMessage: () => {
        const socket = useSocket.getState().socket;

        if (socket) {
            socket.on(
                "recive-message",
                ({ message, id }: { message: string; id: string }) => {}
            );
        }
    },
    clearMessages: () => {
        set({
            messages: [],
            gettingMessageLoading: false,
            sendingMessageLoading: false,
        });
    },
}));

export default useMessage;
