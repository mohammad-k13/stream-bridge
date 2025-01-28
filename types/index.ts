import { ReactNode } from "react";

export interface IServerActionState {
    isError: boolean;
    message: string;
    payload?: any;
}

export interface IFriend {
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


export type FriendRequestStatus = "pending" | "accepted" | "rejected";
export type MessageReadStatus = "unread" | "read";
export type ConversationType = "private" | "group" | "channel";
export type NotificationType =
    | "friend_request"
    | "message"
    | "mention"
    | "system"
    | "friend_request_accepted"
    | "friend_request_rejected";
export type SessionStatus = "active" | "inactive";
export type ConversationMemberRole = "member" | "admin" | "owner";

type FriendRequestMetaData = {
    username: string;
    image: string;
    createdAt: Date;
};

type MessageMetaData = {
    sender: string;
    message: string;
    timestamp: Date;
};

type MentionMetaData = {
    postId: string;
    username: string;
    mentionText: string;
};

type SystemMetaData = {
    updateVersion: string;
    message: string;
};

type FriendRequestAnsweredMetaData = {
    username: string
}

export type NotificationMetaData = {
    friend_request_accepted: FriendRequestAnsweredMetaData,
    friend_request_rejected: FriendRequestAnsweredMetaData,
    friend_request: FriendRequestMetaData;
    message: MessageMetaData;
    mention: MentionMetaData;
    system: SystemMetaData;
};


export const NotificationContent: Record<NotificationType, string> = {
    friend_request: "You have a new friend request.",
    message: "You received a new message.",
    mention: "You were mentioned in a post.",
    system: "System notification: Check for updates.",
    friend_request_accepted: "Your friend request has been accepted!",
    friend_request_rejected: "Your friend request has been rejected.",
};

export interface IReceiveNotification<T extends NotificationType = NotificationType> {
  id: string;
  type: T;
  content: typeof NotificationContent[T];
  isRead: boolean;
  metaData: NotificationMetaData[T];
}