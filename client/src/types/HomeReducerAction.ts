import { Chatroom } from './Chatroom';
import { Conversation } from './Conversation';
import { ActiveChat } from './HomeContextState';

export enum HomeActionType {
    SET_ACTIVE_CHAT = 'set-active-chat',
    SET_CHATROOMS = 'set-chatrooms',
    SET_CONVERSATIONS = 'set-conversations',
}

export type HomeReducerAction =
    | {
          type: HomeActionType.SET_ACTIVE_CHAT;
          payload: ActiveChat;
      }
    | {
          type: HomeActionType.SET_CHATROOMS;
          payload: Chatroom[];
      }
    | {
          type: HomeActionType.SET_CONVERSATIONS;
          payload: Conversation[];
      };
