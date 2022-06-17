import { useContext } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import { Conversation } from '../../types/Conversation';

type ConversationListProps = {
    messages: Conversation[];
};

const ConversationList: React.FC<ConversationListProps> = ({ messages }) => {
    const { setActiveChatView, activeChat } = useContext(HomeContext);

    return (
        <ul>
            {messages.map((conversation: Conversation) => (
                <li
                    key={conversation.id}
                    className={`text-2xl flex cursor-pointer hover:bg-black hover:bg-opacity-50 hover:text-white ${
                        activeChat?.name === conversation.name &&
                        'bg-black text-white'
                    }`}
                >
                    <button
                        type="button"
                        className="flex w-full h-full justify-left"
                        onClick={() => {
                            setActiveChatView({
                                ...conversation,
                                type: 'conversation',
                            });
                        }}
                    >
                        # {conversation.name}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default ConversationList;
