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
    senderId: string;
    recieverId: string;
    text: string;
}
