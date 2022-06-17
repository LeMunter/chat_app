import ROLE from './Role';

export type User = {
    id: number;
    username: string;
    role: ROLE;
};

export type AdminPanelUsers = {
    moderators: User[];
    chatters: User[];
};

export type NewUser = {
    username: string;
    password: string;
    role: string;
    active: boolean;
};

export type LoginUser = {
    username: string;
    password: string;
};

export type LoginResponse = {
    username: string;
    id: number;
    role: ROLE;
    token: string;
};

export type AuthResponse = {
    token: string;
    id: number;
    username: string;
    role: string;
    status: boolean;
};
