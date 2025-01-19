import { IReceiveNotification } from "@/types";
import { create } from "zustand";
import { useSocket } from "../socket";
import { toast } from "sonner";

export interface IUseNotification {
    notifications: IReceiveNotification[];
    getAllNotification: () => void;
    listToNotifications: () => void;
    markAsReadThisNotification: (notificationId: string) => void;
}

const useNotification = create<IUseNotification>((set, get) => ({
    notifications: [],
    listToNotifications: () => {
        const socket = useSocket.getState().socket;
        if (!socket) return;

        socket.emit("notification:getAll", (allNotification: any) => {
            console.log("allNotification", allNotification);
        });

        socket.on("notification:received", (data: IReceiveNotification) => {
            const {
                id,
                content,
                isRead,
                metaData: { image, username, createAt },
                type,
            } = data;

            switch (type) {
                case "friend_request":
                    // Handle friend request
                    toast.info(`${content} from ${username}`);
                    break;

                case "message":
                    // Handle new message
                    toast.success(`${content} from ${username}`);
                    break;

                case "mention":
                    // Handle mention
                    toast.info(`${content} - you were mentioned by ${username}`);
                    break;

                case "system":
                    // Handle system notification
                    toast.info(`System: ${content}`);
                    break;

                default:
                    break;
            }
        });
    },
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
