import type { User } from './User';

export enum AuthActionType {
    USER_LOGIN = 'USER_LOGIN',
}

export type LoginAction = { type: AuthActionType; payload: User };
