export type DBUser = {
    id: number;
    username: string;
    password: string;
    active: boolean;
    role: string;
}

export type DBConfig = {
    client: string,
    connection: {
        host: string,
        user: string,
        password: string,
        database: string,
        port: string
    }
}

export type SequelizeConfig = {
        host: string,
        user: string,
        password: string,
        database: string,
        port: number
}

export type DBMessage = {
    user_id: number;
    message: string;
    id: number;
    room_id: number; 
}