import { useState, MouseEvent, useContext } from 'react';
import Searchbar from './Searchbar';
import chatImg from '../../images/chat.png';
import ChatroomList from './ChatroomList';
import { HomeContext } from '../../context/HomeProvider';
import DirectMessageList from './ConversationList';

const MESSAGES = 'messages';
const CHAT_ROOMS = 'chat-rooms';

const SideBar: React.FC = () => {
    const [activeList, setActiveList] = useState<string>(MESSAGES);
    const { rooms, conversations } = useContext(HomeContext);

    const showMessages = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setActiveList(MESSAGES);
    };

    const showRooms = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setActiveList(CHAT_ROOMS);
    };

    return (
        <div className="mt-1 w-full sm:w-1/3 md:w-1/4 px-2 bg-gray-300 rounded">
            <div className="top-0 p-3 w-full">
                <div className="user-profile text-center">
                    <img
                        className="w-32 h-32 mx-auto"
                        src={chatImg}
                        alt="user"
                    />
                </div>

                <div className="menu mt-8">
                    <div className="inline-flex w-full">
                        <button
                            type="button"
                            onClick={showMessages}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-auto"
                        >
                            Messages
                        </button>
                        <button
                            type="button"
                            onClick={showRooms}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r mx-auto"
                        >
                            Rooms
                        </button>
                    </div>
                    <div>
                        <div className="sidebar hidden lg:flex w-full flex-2 flex-col pr-6">
                            <hr className="my-5" />
                            {/* <Searchbar /> */}
                            {activeList === MESSAGES && conversations && (
                                <DirectMessageList messages={conversations} />
                            )}
                            {activeList === CHAT_ROOMS && rooms && (
                                <ChatroomList chatrooms={rooms} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
