import type { User } from '../../../types/User';
import ListItem from './ListItem';

type UsersListProps = {
    users: User[];
    title: string;
    listRoleImg: string;
    removeUser: (id: number) => void;
};

const UsersList: React.FC<UsersListProps> = ({
    users,
    title,
    listRoleImg,
    removeUser,
}) => {
    return (
        <div className="rounded hideScroll shadow-lg">
            <div className="px-6 py-4">
                <img className="w-1/4 h-1/4" src={listRoleImg} alt={title} />
                <div className="font-bold text-xl mb-2">{title}</div>
                <ul>
                    {users.map((user: User) => (
                        <ListItem
                            user={user}
                            key={user.id}
                            removeUser={(id: number) => removeUser(id)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UsersList;
