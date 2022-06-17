import chatImg from '../../images/chat.png';

type ChannelProps = {
    name: string;
    message: string;
};

const Channel: React.FC<ChannelProps> = ({ name, message }) => {
    return (
        <div className="mx-auto">
            <div className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
                <div className="flex-2">
                    <div className="w-12 h-12 relative">
                        <img
                            className="w-12 h-12 rounded-full mx-auto"
                            src={chatImg}
                            alt="chat-user"
                        />
                        <span className="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white" />
                    </div>
                </div>
                <div className="flex-1 px-2">
                    <div className="truncate w-32">
                        <span className="text-gray-800"> {name} </span>
                    </div>
                    <div>
                        <small className="text-gray-600">{message}</small>
                    </div>
                    <div className="flex-2 text-right">
                        <div>
                            <small className="text-gray-500">2 dec</small>
                        </div>
                        <div>
                            <small className="text-xs bg-gray-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                                1
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Channel;
