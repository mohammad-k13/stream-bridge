import { ReactNode } from "react"

export interface IServerActionState {
      isError: boolean,
      message: string,
      payload?: any
}

export interface IChat {
      username: string,
      image: string,
      
}

export interface Props {
      children: ReactNode;
}