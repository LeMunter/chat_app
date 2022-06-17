import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moderatorImg from '../images/moderator.png';
import chattareImg from '../images/chattare.png';
import editUserImg from '../images/edit.png';
import type { User } from '../types/User';
import ROLE from '../types/Role';
import UserService from '../utils/http/user-service';
import AdminRoomList from '../components/AdminPanelComponents/RoomsList/RoomList';

const AdminPanel: React.FC = () => {
    const [userData, setUserData] = useState<User[]>([]);

    useEffect(() => {
        (async () => {
            const userService = new UserService();
            const resUser = await userService.getAll();
            setUserData(resUser);
        })();
    }, []);

    const removeUser = async (id: number): Promise<void> => {
        const userService = new UserService();
        await userService.delete(id);
        setUserData(userData.filter((ud: User) => ud.id !== id));
    };

    return (
        <>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 bg-gray-600 ">
                <AdminRoomList />

                <div className="rounded  hideScroll shadow-lg relative ">
                    <div className="px-6 py-4 ">
                        <img
                            className="w-1/4 h-1/4"
                            src={moderatorImg}
                            alt="Moderator"
                        />
                        <div className="font-bold text-xl mb-2">Moderator</div>
                        <ul>
                            {userData.map(
                                (user: User) =>
                                    user.role === ROLE.MOD && (
                                        <li key={user.id}>
                                            <div className="inline-flex space-x-4 p-1 pt-5">
                                                <div className="inline-flex ">
                                                    <img
                                                        className="w-5 h-5"
                                                        src={moderatorImg}
                                                        alt="Moderator"
                                                    />
                                                    <h3 className="mr-10 ">
                                                        {user.username}{' '}
                                                    </h3>
                                                </div>
                                                <div className="inline-flex space-x-4 absolute pl-48">
                                                    <Link to="/create-user">
                                                        <img
                                                            className="w-8 h-8 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                                            src={editUserImg}
                                                            alt="Edit"
                                                        />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            removeUser(user.id);
                                                        }}
                                                        className="btn btn-red btn-red:hover"
                                                    >
                                                        REMOVE
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                            )}
                        </ul>
                    </div>
                </div>
                <div className="rounded hideScroll shadow-lg">
                    <div className="px-6 py-4">
                        <img
                            className="w-1/4 h-1/4"
                            src={chattareImg}
                            alt="Chattare"
                        />
                        <div className="font-bold text-xl mb-2 ">Chattare</div>
                        <ul>
                            {userData.map(
                                (user: User) =>
                                    user.role === ROLE.USER && (
                                        <li key={user.id}>
                                            <div className="inline-flex space-x-4 p-1 pt-5">
                                                <div className="inline-flex ">
                                                    <img
                                                        className="w-5 h-5"
                                                        src={chattareImg}
                                                        alt="Moderator"
                                                    />
                                                    <h3 className="mr-10 ">
                                                        {user.username}{' '}
                                                    </h3>
                                                </div>
                                                <div className="inline-flex space-x-4 absolute pl-48">
                                                    <Link to="/create-user">
                                                        <img
                                                            className="w-8 h-8 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 "
                                                            src={editUserImg}
                                                            alt="Edit"
                                                        />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            removeUser(user.id);
                                                        }}
                                                        className="btn btn-red btn-red:hover"
                                                    >
                                                        REMOVE
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPanel;
