import ROLE from '../../types/Role';

type MessageProps = {
    currentUser?: number;
    currentUserRole?: string;
    user_id: number;
    id: number;
    name: string;
    message: string;
    removeMessage: (id: number) => void;
};

const Message: React.FC<MessageProps> = ({
    currentUser,
    currentUserRole,
    user_id,
    id,
    name,
    message,
    removeMessage,
}) => {
    return (
        <div className="relative px-4 py-4 w-3/4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden">
            <div className="flex w-full">
                <div className="flex-1 text-left">
                    <h3>{name}</h3>
                    <p>{message}</p>
                </div>
                <div className="text-right">
                    {currentUser === user_id ||
                    currentUserRole === ROLE.ADMIN ? (
                        <button
                            type="button"
                            className="btn btn-red btn-red:hover"
                            onClick={() => removeMessage(id)}
                        >
                            X
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Message;
