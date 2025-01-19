import { IReceiveNotification } from "@/types";
import { create } from "zustand";
import { useSocket } from "../socket";
import { toast } from "sonner";

export interface IUseNotification {
    notifications: IReceiveNotification[];
    getAllNotification: () => void;
    markAsReadThisNotification: (notificationId: string) => void;
}

const useNotification = create<IUseNotification>((set, get) => ({
    notifications: [],
    getAllNotification: () => {},
    markAsReadThisNotification: (notificationId) => {
        const socket = useSocket.getState().socket;

        if (socket) {
            socket.emit("notification:markAsRead", { notificationId }, (message: string) => {
                //this callback will run when notification updated in db
                //find notification
                const selectedNotification = get().notifications.find(
                    (item) => item.id !== notificationId
                );

                //update notification
                if (selectedNotification) {
                    if (selectedNotification.isRead) {
                        toast.info("This Notfication Marked as Seen");
                    }
                    const updatedNotification: IReceiveNotification = {
                        ...selectedNotification,
                        isRead: true,
                    };
                    set((state) => ({
                        notifications: [...state.notifications, updatedNotification],
                    }));
                    toast.success(message);
                } else {
                    toast.error("Notification Not Found");
                }
            });
        }
    },
}));

export default useNotification;
