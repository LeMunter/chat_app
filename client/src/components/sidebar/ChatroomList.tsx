import { useContext, useState } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import { Chatroom } from '../../types/Chatroom';

type ChatroomListProps = {
    chatrooms: Chatroom[];
};

const ChatroomList: React.FC<ChatroomListProps> = ({ chatrooms }) => {
    const { setActiveChatView, activeChat } = useContext(HomeContext);
    const [join, setJoin] = useState(false);
    return (
        <ul>
            {chatrooms.map((chatroom: Chatroom) => (
                <li
                    key={chatroom.id}
                    className={`text-2xl flex cursor-pointer 
                    hover:bg-black hover:bg-opacity-50 hover:text-white ${
                        activeChat?.name === chatroom.name &&
                        'bg-black text-white'
                    }`}
                >
                    <button
                        type="button"
                        className="flex w-full h-full justify-left"
                        onClick={() => {
                            setActiveChatView({
                                ...chatroom,
                                type: 'chatroom',
                            });
                        }}
                    >
                        # {chatroom.name}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default ChatroomList;
