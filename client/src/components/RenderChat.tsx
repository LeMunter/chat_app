import { useContext } from 'react';
import Chat from './Chatroom/Chat';
import PublicChatSection from './Chatroom/PublicChatSection';
import { HomeContext } from '../context/HomeProvider';

const RenderChat: React.FC = () => {
    const { activeChat } = useContext(HomeContext);
    return <div>{activeChat ? <Chat /> : <PublicChatSection />}</div>;
};

export default RenderChat;
