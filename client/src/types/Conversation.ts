import { User } from './User';

export type Conversation = {
    id: number;
    name: string;
    users: User[];
    isDM: boolean;
};

export type NewConversation = {
    user_ids: number[];
};
