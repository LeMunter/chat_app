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
                    className={`flex cursor-pointer hover:bg-black hover:bg-opacity-50 hover:text-white ${
                        activeChat?.name === conversation.name &&
                        'bg-black text-white'
                    }`}
                >
                    <button
                        type="button"
                        className="flex w-full h-full justify-left"
                        onClick={() => {
                            setActiveChatView(conversation);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {conversation.name}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default ConversationList;
