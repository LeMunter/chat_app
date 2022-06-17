import { Chatroom } from './Chatroom';
import { Conversation } from './Conversation';

export type ActiveChat =
    | (Chatroom & { type: 'chatroom' })
    | (Conversation & { type: 'conversation' });

type HomeContextState = {
    activeChat?: ActiveChat;
    conversations: Conversation[];
    rooms: Chatroom[];
    setActiveChatView: (chatroomOrConversation: ActiveChat) => void;
    getAllConversations: () => void;
    getAllChatrooms: () => void;
};

export default HomeContextState;
