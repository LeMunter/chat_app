export type RequestUserCreate = {
    username: string;
    password: string;
    role: string;
    active: boolean;
}

export type RequestRoomCreate = {
    name: string;
    public: boolean;
    tag: string;
    user_ids: number[];
}

export type RequestMessageCreate = {
    name: string;
    message: string;
    userID: number;
    roomID: number
}
