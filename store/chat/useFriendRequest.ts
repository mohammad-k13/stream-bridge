import { axiosClient } from "@/lib/axios";
import { IChat, IFriendRequest } from "@/types";
import { Socket } from "socket.io-client";
import { create } from "zustand";
import { useSocket } from "../socket";
import { toast } from "sonner";

interface IUseFriendRequest {
    friendRequests: IFriendRequest[];
    newFriendRequest: IFriendRequest[];
    getFriendRequest: () => void;
    setNewFriendRequest: (friendRequests: IFriendRequest) => void;
    markAsReadThisNotification: (notificationId: string) => void;
}

const useFriendRequest = create<IUseFriendRequest>((set, get) => ({
    friendRequests: [],
    newFriendRequest: [],
    getFriendRequest: async () => {
        const { data } = await axiosClient<IFriendRequest[]>("/all-friend-request");
        set({ friendRequests: data, newFriendRequest: data.filter((request) => !request.isRead) });
    },
    setNewFriendRequest: (friendRequest) => {
        set({newFriendRequest: [...get().newFriendRequest, friendRequest]})
    },
    markAsReadThisNotification: (notificationId) => {
        const socket = useSocket.getState().socket;
       if(socket) {
        socket.emit("notification:markAsRead", {notificationId}, (message: string) => {
            toast.success(message);
            const updatedRequest = useFriendRequest.getState().newFriendRequest.filter(item => item._id !== notificationId);
            useFriendRequest.setState({newFriendRequest: updatedRequest})
        });
       }
    }
}));

export default useFriendRequest;
