import { useContext } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import { Chatroom } from '../../types/Chatroom';

type joinProps = {
    chatroom: Chatroom;
};
const Join: React.FC<joinProps> = ({ chatroom }) => {
    const { setActiveChatView, activeChat } = useContext(HomeContext);

    return (
        <div className="w-full h-full">
            <div>
                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={() => {
                            setActiveChatView({
                                ...chatroom,
                                type: 'chatroom',
                            });
                        }}
                        className="text-white transition-colors duration-150
                    bg-gray-700 rounded-lg focus:shadow-outline 
                    hover:bg-gray-800 mx-auto w-10 h-10"
                    >
                        Join
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Join;
