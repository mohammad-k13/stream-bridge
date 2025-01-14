"use client";

import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { getCookie } from "@/lib/cookies";

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
            withCredentials: true,
            autoConnect: false,
            auth: {
                token: getCookie("sessionToken"),
            },
        });

        socketInstance.connect();
        setSocket(socketInstance);

        socketInstance.on("connect", () => {
            console.log("Socket connected");
        });

        socketInstance.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        return () => {
            if (socketInstance) {
                console.log("Socket disconnected");
                socketInstance.disconnect();
            }
        };
    }, []);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

interface UseSocket {
    socket: Socket;
}

export const useSocket = (): UseSocket => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context as UseSocket;
};