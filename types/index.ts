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
    createAt: Date;
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

export type NotificationMetaData = {
    friend_request_accepted: Object,
    friend_request_rejected: Object,
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

export type ActivityTypes =
    | "login"
    | "logout"
    | "message_sent"
    | "message_received"
    | "friend_request_sent"
    | "friend_request_accepted"
    | "friend_request_rejected"
    | "profile_updated"
    | "password_changed"
    | "email_changed"
    | "notification_read"
    | "account_deleted"
    | "conversation_created"
    | "conversation_deleted"
    | "message_deleted"
    | "media_uploaded"
    | "media_deleted"
    | "group_member_added"
    | "group_member_removed"
    | "role_changed"
    | "mention"
    | "system_event";
type MediaTypes = "image" | "video" | "audio" | "document";
export type AllowedValues = {
    FriendRequestStatus: FriendRequestStatus[];
    MessageReadStatus: MessageReadStatus[];
    ConversationType: ConversationType[];
    NotificationType: NotificationType[];
    SessionStatus: SessionStatus[];
    ConversationMemberRole: ConversationMemberRole[];
    ActivityType: ActivityTypes[];
    MediaType: MediaTypes[];
};

export const allowedValues: AllowedValues = {
    FriendRequestStatus: ["pending", "accepted", "rejected"],
    MessageReadStatus: ["unread", "read"],
    ConversationType: ["private", "group"],
    NotificationType: [
        "friend_request",
        "friend_request_accepted",
        "friend_request_rejected",
        "message",
        "mention",
        "system",
    ],
    SessionStatus: ["active", "inactive"],
    ConversationMemberRole: ["member", "admin", "owner"],
    ActivityType: [
        "login",
        "logout",
        "message_sent",
        "message_received",
        "friend_request_sent",
        "friend_request_accepted",
        "friend_request_rejected",
        "profile_updated",
        "password_changed",
        "email_changed",
        "notification_read",
        "account_deleted",
        "conversation_created",
        "conversation_deleted",
        "message_deleted",
        "media_uploaded",
        "media_deleted",
        "group_member_added",
        "group_member_removed",
        "role_changed",
        "mention",
        "system_event",
    ],
    MediaType: ["image", "video", "audio", "document"],
};

type StaticValue<K extends keyof AllowedValues> = {
    id?: string;
    key: K;
    value: AllowedValues[K][number];
    description: string;
};

// All possible static values, respecting the key-value structure
export const allStaticsValues: StaticValue<keyof AllowedValues>[] = [
    {
        key: "FriendRequestStatus",
        value: "pending",
        description: "Request is pending",
    },
    {
        key: "FriendRequestStatus",
        value: "accepted",
        description: "Request has been accepted",
    },
    {
        key: "FriendRequestStatus",
        value: "rejected",
        description: "Request has been rejected",
    },
    {
        key: "MessageReadStatus",
        value: "unread",
        description: "Message is unread",
    },
    {
        key: "MessageReadStatus",
        value: "read",
        description: "Message has been read",
    },
    {
        key: "ConversationType",
        value: "private",
        description: "Private conversation between two users",
    },
    {
        key: "ConversationType",
        value: "group",
        description: "Group conversation with multiple members",
    },
    {
        key: "NotificationType",
        value: "friend_request",
        description: "Notification for a friend request",
    },
    {
        key: "NotificationType",
        value: "message",
        description: "Notification for a new message",
    },
    {
        key: "NotificationType",
        value: "mention",
        description: "Notification for a mention",
    },
    {
        key: "NotificationType",
        value: "system",
        description: "System-related notification",
    },
    {
        key: "SessionStatus",
        value: "active",
        description: "Session is currently active",
    },
    {
        key: "SessionStatus",
        value: "inactive",
        description: "Session has been terminated or expired",
    },
    {
        key: "ConversationMemberRole",
        value: "member",
        description: "Standard member of the conversation",
    },
    {
        key: "ConversationMemberRole",
        value: "admin",
        description: "Admin of the conversation with special privileges",
    },
    {
        key: "ConversationMemberRole",
        value: "owner",
        description: "Owner of the conversation with full control",
    },
    { key: "ActivityType", value: "login", description: "User logged into the system" },
    { key: "ActivityType", value: "logout", description: "User logged out of the system" },
    { key: "ActivityType", value: "message_sent", description: "User sent a message" },
    { key: "ActivityType", value: "message_received", description: "User received a message" },
    {
        key: "ActivityType",
        value: "friend_request_sent",
        description: "User sent a friend request",
    },
    {
        key: "ActivityType",
        value: "friend_request_accepted",
        description: "User accepted a friend request",
    },
    {
        key: "ActivityType",
        value: "friend_request_rejected",
        description: "User rejected a friend request",
    },
    {
        key: "ActivityType",
        value: "profile_updated",
        description: "User updated their profile details",
    },
    {
        key: "ActivityType",
        value: "password_changed",
        description: "User changed their password",
    },
    {
        key: "ActivityType",
        value: "email_changed",
        description: "User changed their email address",
    },
    {
        key: "ActivityType",
        value: "notification_read",
        description: "User read a notification",
    },
    {
        key: "ActivityType",
        value: "account_deleted",
        description: "User deleted their account",
    },
    {
        key: "ActivityType",
        value: "conversation_created",
        description: "User created a new conversation",
    },
    {
        key: "ActivityType",
        value: "conversation_deleted",
        description: "User deleted a conversation",
    },
    { key: "ActivityType", value: "message_deleted", description: "User deleted a message" },
    {
        key: "ActivityType",
        value: "media_uploaded",
        description: "User uploaded a media file",
    },
    { key: "ActivityType", value: "media_deleted", description: "User deleted a media file" },
    {
        key: "ActivityType",
        value: "group_member_added",
        description: "A member was added to a group conversation",
    },
    {
        key: "ActivityType",
        value: "group_member_removed",
        description: "A member was removed from a group conversation",
    },
    {
        key: "ActivityType",
        value: "role_changed",
        description: "User's role was changed in a conversation",
    },
    {
        key: "ActivityType",
        value: "mention",
        description: "User was mentioned in a conversation",
    },
    {
        key: "ActivityType",
        value: "system_event",
        description: "A system-related activity occurred",
    },

    { key: "MediaType", value: "image", description: "Media type is an image" },
    { key: "MediaType", value: "video", description: "Media type is a video" },
    { key: "MediaType", value: "audio", description: "Media type is audio" },
    { key: "MediaType", value: "document", description: "Media type is a document" },
];

export interface IReceiveNotification<T extends NotificationType = NotificationType> {
  id: string;
  type: T;
  content: typeof NotificationContent[T];
  isRead: boolean;
  metaData: Record<string, any>;
}