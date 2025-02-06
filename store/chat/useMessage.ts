import { IMessage, NotificationContent } from "@/types";
import { create } from "zustand";
import { useSocket } from "../socket";
import { toast } from "sonner";
import { axiosClient } from "@/lib/axios";
import useFriendsList from "./useFriendsList";

interface IUseMessage {
    messages: IMessage[];
    gettingMessageLoading: boolean;
    sendingMessageLoading: boolean;

    getAllMessages: (selectedFriendId: string) => void;
    sendMessage: (message: string, recieverId: string) => void;
    subscribeToNewMessage: () => void;
    saveMessagesInIndexedDb: () => void;
    clearMessages: () => void;
}

const useMessage = create<IUseMessage>((set, get) => ({
    messages: [],
    gettingMessageLoading: false,
    sendingMessageLoading: false,

    getAllMessages: async (selectedFriendId) => {
        set({gettingMessageLoading: true})
        const { data: allMessages } = await axiosClient<IMessage[]>("/chat-messages", {
            params: { friendId: selectedFriendId },
        });

        set({ messages: allMessages, gettingMessageLoading: false });
    },
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
                (text: string, id: string, createdAt: string) => {
                    const outBoxMessage: IMessage = { text, type: "out_box", id, createdAt};
                    set(({ messages }) => ({
                        messages: [...messages, outBoxMessage],
                        sendingMessageLoading: false,
                    }));
                }
            );
        }
    },
    subscribeToNewMessage: () => {
        const socket = useSocket.getState().socket;

        if (socket) {
            socket.on(
                "recive-message",
                ({
                    message,
                    id,
                    senderId,
                    createdAt
                }: {
                    message: string;
                    id: string;
                    senderId: string;
                    createdAt: string
                }) => {
                    const currentChatSelectedId = useFriendsList.getState().selectedFriend;

                    if (String(currentChatSelectedId?._id) === String(senderId)) {
                        const newMessage: IMessage = { text: message, id, type: "in_box", createdAt };
                        set(({ messages }) => ({ messages: [...messages, newMessage] }));
                    } else {
                        useFriendsList.getState().setFriendsNewMessage(senderId)
                        toast.info(NotificationContent["message"]);
                    }
                }
            );
        }
    },
    saveMessagesInIndexedDb: () => {},
    clearMessages: () => {
        const socket = useSocket.getState().socket;
        if (socket) {
            socket.off("recive-message");
        }

        set({
            messages: [],
            gettingMessageLoading: false,
            sendingMessageLoading: false,
        });
    },
}));

export default useMessage;
