import { ReactNode } from "react";

export interface IServerActionState {
    isError: boolean;
    message: string;
    payload?: any;
}

export interface IChat {
    username: string;
    image: string;
    _id: string;
}

export interface Props {
    children: ReactNode;
}

export interface IMessage {
    id: string;
    type: "in_box" | "out_box";
    text: string;
}

export interface IUser {
    username: string;
    email: string;
    image: string;
}

export interface IFriendRequest {
    _id: string;
    status: "pending" | "accepted" | "rejected";
    isRead: boolean,
    createdAt: Date,
    senderInfo: {
        username: string;
        image: string;
    };
}


export type NotificationType = "friend_request" | "message" | "mention" | "system";

export const NotificationContent: Record<NotificationType, string> = {
  friend_request: "You have a new friend request.",
  message: "You received a new message.",
  mention: "You were mentioned in a post.",
  system: "System notification: Check for updates.",
};

export interface IReceiveNotification<T extends NotificationType = NotificationType> {
  id: string;
  type: T;
  content: typeof NotificationContent[T];
  isRead: boolean;
  metaData: Record<string, any>;
}