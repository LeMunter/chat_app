import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router';
import chatImg from '../images/chat.png';
import { Chatroom as ChatroomType } from '../types/Chatroom';
import ChatroomService from '../utils/http/chatroom-service';

type ChatroomProps = {
    chatroom?: ChatroomType;
    updateModal: () => void;
};

/**
 * Makes Admin able to create chat rooms for users.
 * @returns HTML for creating a chatroom.
 */
const Chatroom: React.FC<ChatroomProps> = ({ chatroom, updateModal }) => {
    const [chatroomName, setChatroomName] = useState<string>(
        chatroom?.name || ''
    );
    const [chatroomTag, setChatroomTag] = useState<string[]>(
        chatroom?.tags || []
    );
    const navigate = useNavigate();
    const publicRef = useRef<any>();

    const handleChatroomName = (e: ChangeEvent<HTMLInputElement>): void => {
        setChatroomName(e.target.value);
    };

    const handleChatroomTag = (e: ChangeEvent<HTMLInputElement>): void => {
        setChatroomTag(e.target.value.split(','));
    };

    const handleOnSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        const chatroomService = new ChatroomService();

        if (chatroom === undefined) {
            const data = {
                name: chatroomName,
                is_public: publicRef.current?.checked,
                tags: chatroomTag,
            };
            await chatroomService.create(data);

            navigate('/admin');
        } else {
            const data = {
                id: chatroom.id,
                name: chatroomName,
                is_public: publicRef.current?.checked,
                tags: chatroomTag,
            };
            await chatroomService.update(data, data.id);

            updateModal();
        }
    };

    return (
        <div className="bg-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-gray-100 rounded p-5 w-96">
                <header>
                    <button
                        type="button"
                        onClick={() => {
                            if (updateModal() === undefined) {
                                navigate('/admin');
                            }
                        }}
                        className="btn btn-red float-right"
                    >
                        X
                    </button>
                    <img
                        className="w-20 mx-auto mb-5"
                        alt={chatImg}
                        src={chatImg}
                    />
                </header>
                <form onSubmit={handleOnSubmit}>
                    <label
                        className="block mb-2 text-indigo-500"
                        htmlFor="ChatroomName"
                    >
                        Chatroom Name
                        <input
                            onChange={handleChatroomName}
                            className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                            type="text"
                            id="ChatroomName"
                            defaultValue={chatroom?.name || ''}
                        />
                    </label>
                    <label
                        className="block mb-2 text-indigo-500"
                        htmlFor="ChatroomTags"
                    >
                        Chatroom Tags
                        <input
                            onChange={handleChatroomTag}
                            className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                            type="text"
                            id="ChatroomTag"
                            defaultValue={chatroom?.tags || []}
                        />
                    </label>
                    <label
                        className="block mb-2 text-indigo-500"
                        htmlFor="ChatroomPublic"
                    >
                        Chatroom Public
                        <input
                            ref={publicRef}
                            className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                            type="checkbox"
                            defaultChecked={chatroom?.is_public || true}
                            id="ChatroomPublic"
                        />
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-indigo-700 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-6 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatroom;
