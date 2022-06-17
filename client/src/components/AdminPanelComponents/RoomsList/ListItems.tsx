import { Chatroom as ChatroomType } from '../../../types/Chatroom';
import deleteImg from '../../../images/delete.png';
import editUserImg from '../../../images/edit.png';

type ListItemsProps = {
    title: string;
    chatrooms: ChatroomType[];
    removeChatroom: (id: number) => void;
    updateChatroom: (chatroom: ChatroomType) => void;
};

const ListItems: React.FC<ListItemsProps> = ({
    title,
    removeChatroom,
    updateChatroom,
    chatrooms,
}) => {
    return (
        <div>
            <div className="font-bold text-xl mb-2">{title}</div>
            <ul>
                {chatrooms &&
                    chatrooms.map((chatroom: ChatroomType) => {
                        return (
                            <li key={chatroom.id}>
                                <div className="inline-flex space-x-4">
                                    <h3>{chatroom.name}</h3>
                                    {chatroom.tags.map((item: string) => {
                                        return (
                                            <div
                                                key={item}
                                                className="outerTag"
                                            >
                                                <div className="innerTag">
                                                    {item}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <span className="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white " />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeChatroom(chatroom.id)
                                        }
                                    >
                                        <img
                                            className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                            src={deleteImg}
                                            alt="Delete"
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => updateChatroom(chatroom)}
                                    >
                                        <img
                                            className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                            src={editUserImg}
                                            alt="Edit"
                                        />
                                    </button>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default ListItems;
