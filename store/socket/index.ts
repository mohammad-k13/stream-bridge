import { getCookie } from "@/lib/cookies";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";

export interface ISocket {
    socket: Socket | null;
    connectToSocket: () => void;
    disconnectSocket: () => void;
}

export const useSocket = create<ISocket>((set, get) => ({
    socket: null,
    connectToSocket: () => {
        const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
            withCredentials: true,
            autoConnect: false,
            auth: {
                token: getCookie("sessionToken"),
            },
        });

        socketInstance.connect();
        set({socket: socketInstance})
    },
    disconnectSocket: () => {
      get().socket?.disconnect();
    }
}));

