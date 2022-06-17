export type Message = {
    id: number;
    room_id: number;
    user_id: number;
    username: string;
    message: string;
    createdAt?: Date;
};

export type NewMessage = {
    room_id: number;
    user_id: number;
    message: string;
};
