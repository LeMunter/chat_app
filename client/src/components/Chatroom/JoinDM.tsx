import { User } from '../../types/User';

type joinProps = {
    user: User;
    joinDM: (id: number) => void;
};
const JoinDM: React.FC<joinProps> = ({ user, joinDM }) => {
    return (
        <div className="w-full h-full">
            <div>
                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={() => joinDM(user.id)}
                        className="text-white transition-colors duration-150
                    bg-gray-700 rounded-lg focus:shadow-outline 
                    hover:bg-gray-800 mx-auto w-10 h-10"
                    >
                        DM
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinDM;
