import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../../types/User';
import ROLE from '../../types/Role';
import UserService from '../../utils/http/user-service';
import ChatroomService from '../../utils/http/chatroom-service';
import chattare from '../../images/chattare.png';
import chat from '../../images/chat.png';
import { Chatroom } from '../../types/Chatroom';
import JoinChatroom from './JoinChatroom';
import JoinDM from './JoinDM';
import ConversationService from '../../utils/http/conversation-service';
import { AuthContext } from '../../context/AuthProvider';
import { HomeContext } from '../../context/HomeProvider';

const NoChat: React.FC = () => {
    const [userData, setUserData] = useState<User[]>([]);
    const [chatroomData, setChatroomData] = useState<Chatroom[]>([]);
    const { user } = useContext(AuthContext);
    const { getAllConversations } = useContext(HomeContext);

    const joinChatRoom = (roomID: number): void => {
        console.log(`Joining chatroom: ${roomID}`);
    };

    const createDM = async (userID: number): Promise<void> => {
        const conversationService = new ConversationService();
        if (user?.id && userID) {
            await conversationService.create({
                user_ids: [userID, user?.id],
            });
            console.log(`Creating dm with: ${user.id} and ${userID}`);

            getAllConversations();
        }
    };

    useEffect(() => {
        (async () => {
            const userService = new UserService();
            const chatroomService = new ChatroomService();
            const resUser = await userService.getAll();
            const resChatroom = await chatroomService.getAll();
            setUserData(resUser);
            setChatroomData(resChatroom);
        })();
    }, []);

    return (
        <div className="dynamic-height-chat bg-gray-600">
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 bg-gray-600 ">
                <div className="rounded overflow-x-hidden overflow-y-auto shadow-lg">
                    <div className="px-6 py-4 float-left">
                        <div className="font-bold text-xl mb-2">
                            Direct message
                        </div>
                        <ul>
                            {userData.map(
                                (u: User) =>
                                    u.role === ROLE.USER &&
                                    u.id !== user?.id && (
                                        <li key={u.id}>
                                            <div className="inline-flex space-x-2 space-y-5 float-left items-end">
                                                <JoinDM
                                                    user={u}
                                                    joinDM={async (
                                                        id: number
                                                    ) => createDM(id)}
                                                />
                                                <h3
                                                    className="flex cursor-pointer 
                                            hover:bg-black hover:bg-opacity-50 
                                            hover:text-white"
                                                >
                                                    {u.username}{' '}
                                                </h3>
                                                <img
                                                    className="w-6 h-6"
                                                    src={chattare}
                                                    alt="chattare"
                                                />
                                            </div>
                                        </li>
                                    )
                            )}
                        </ul>
                    </div>
                </div>

                <div className="rounded overflow-scroll overflow-x-hidden overflow-y-auto shadow-lg">
                    <div className="px-6 py-4 float-left">
                        <div className="font-bold text-xl mb-2">
                            Public Chats
                        </div>
                        <ul>
                            {chatroomData.map(
                                (chatroom: Chatroom) =>
                                    chatroom.is_public === true && (
                                        <li key={chatroom.id}>
                                            <div className="inline-flex space-x-2 space-y-5 float-left items-end">
                                                <JoinChatroom
                                                    chatroom={chatroom}
                                                />
                                                <button
                                                    className="inline-flex flex cursor-pointer 
                        hover:bg-black hover:bg-opacity-50 
                        hover:text-white"
                                                    type="button"
                                                    value={chatroom.name}
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
                                                    {chatroom.name}
                                                </button>

                                                <img
                                                    className="w-6 h-6"
                                                    src={chat}
                                                    alt="chat"
                                                />
                                            </div>
                                        </li>
                                    )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoChat;
