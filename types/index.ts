export interface IServerActionState {
      isError: boolean,
      message: string,
      payload?: any
}

export interface IChat {
      username: string,
      profileUrl: string,
      online: boolean,
      lastMessage: string | null
}