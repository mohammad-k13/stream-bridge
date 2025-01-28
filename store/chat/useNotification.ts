import {
    IFriendRequest,
    IReceiveNotification,
    NotificationMetaData,
    NotificationType,
} from "@/types";
import { create } from "zustand";
import { useSocket } from "../socket";
import { toast } from "sonner";
import useFriendRequest from "./useFriendRequest";

export interface IUseNotification {
    notifications: IReceiveNotification[];
    getAllNotification: () => void;
    subscribeToNotifications: () => void;
    markAsReadThisNotification: (notificationId: string) => void;
}

const useNotification = create<IUseNotification>((set, get) => ({
    notifications: [],
    subscribeToNotifications: () => {
        const socket = useSocket.getState().socket;
        if (!socket) return;

        socket.emit("notification:getAll", (allNotification: any) => {
            //todo: show all notification in notification dialog
            console.log("allNotification", allNotification);
        });

        socket.on("notification:received", (data: IReceiveNotification) => {
            console.log("notification recived", data);
            const { id, content, isRead, metaData, type } = data;

            switch (type) {
                case "friend_request":
                    // Handle friend request
                    let {
                        createdAt,
                        image,
                        username: senderUsername,
                    } = metaData as NotificationMetaData[typeof type];

                    const newNotification: IFriendRequest = {
                        _id: id,
                        createdAt,
                        isRead,
                        senderInfo: { image, username: senderUsername },
                        status: "pending",
                    };
                    useFriendRequest.getState().addNewFriendRequest(newNotification);
                    toast.info(`${content}`, {
                        description: `Sender Username: ${senderUsername}`,
                    });
                    break;
                case "friend_request_accepted":
                    // Handle friend request was accepted
                    const { username: accepterUsername } = metaData as NotificationMetaData[typeof type];

                    toast.success(`${accepterUsername} accept your friend request`);
                    break;
                case "friend_request_rejected":
                    // Handle friend request was rejected
                    const { username: rejecterUsername } = metaData as NotificationMetaData[typeof type];

                    toast.error(`${rejecterUsername} reject your friend request`);
                    break;

                case "message":
                    // const MessageMetaData = metaData as IReceiveNotification<typeof type>;

                    // Handle new message
                    break;

                case "mention":
                    // const MentionMetaData = metaData as IReceiveNotification<typeof type>;

                    // Handle mention
                    break;

                case "system":
                    // const SystemMetaData = metaData as IReceiveNotification<typeof type>;

                    // Handle system notification
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
