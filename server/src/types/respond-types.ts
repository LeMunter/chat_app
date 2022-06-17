export type RespondUser = {
    id: number;
    username: string;
    active: boolean;
    role: string;
}

export type RespondRoom = {
    id: number;
    name: string;
    public: boolean;
    tag: string;
}

export type RespondMessage = {
    user_id: number;
    username: string;
    message: string;
    id: number;
    createdAt: Date;
}

export type RespondConversation = {
    id: number;
    name: string;
    users: RespondUser[];
}
