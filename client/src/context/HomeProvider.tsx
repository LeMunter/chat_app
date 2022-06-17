import { createContext, useEffect, useReducer } from 'react';
import HomeContextState, { ActiveChat } from '../types/HomeContextState';
import reducer from './HomeReducer';
import { HomeActionType } from '../types/HomeReducerAction';
import ChatroomService from '../utils/http/chatroom-service';
import ConversationService from '../utils/http/conversation-service';

const initialState: HomeContextState = {
    conversations: [],
    rooms: [],
    setActiveChatView: (): void => {},
    getAllChatrooms: (): void => {},
    getAllConversations: (): void => {},
};

export const HomeContext = createContext<HomeContextState>(initialState);

type HomeProviderProps = { children: React.ReactChild[] | React.ReactChild };

export const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getAllConversations = async (): Promise<void> => {
        const conversationService = new ConversationService();
        const conversations = await conversationService.getAll();

        console.log('HELLOOOOOOO');

        dispatch({
            type: HomeActionType.SET_CONVERSATIONS,
            payload: [...conversations],
        });
    };

    const getAllChatrooms = async (): Promise<void> => {
        const chatroomService = new ChatroomService();
        const chatrooms = await chatroomService.getAll();

        dispatch({
            type: HomeActionType.SET_CHATROOMS,
            payload: [...chatrooms],
        });
    };

    useEffect(() => {
        getAllChatrooms();
        getAllConversations();
    }, []);

    const setActiveChatView = (chatroomOrConversation: ActiveChat): void => {
        dispatch({
            type: HomeActionType.SET_ACTIVE_CHAT,
            payload: chatroomOrConversation,
        });
    };

    return (
        <HomeContext.Provider
            value={{
                activeChat: state.activeChat,
                conversations: state.conversations,
                rooms: state.rooms,
                setActiveChatView,
                getAllChatrooms,
                getAllConversations,
            }}
        >
            {children}
        </HomeContext.Provider>
    );
};
