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
    type: "in_box" | "out_box";
    text: string;
}

export interface IUser {
    username: string;
    email: string;
    image: string;
}
