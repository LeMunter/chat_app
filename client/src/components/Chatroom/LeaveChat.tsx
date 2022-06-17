const LeaveChat: React.FC = () => {
    const refreshPage = (): void => {
        window.location.reload();
    };

    return (
        <div>
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={refreshPage}
                    className="text-white 
                    transition-colors duration-150 
                    bg-red-700 rounded-lg focus:shadow-outline 
                    hover:bg-red-800 mx-auto w-full h-12
                    absolute bottom-0"
                >
                    Leave chat
                </button>
            </div>
        </div>
    );
};

export default LeaveChat;
