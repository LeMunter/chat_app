import { ChangeEvent, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router';
import UserService from '../utils/http/user-service';
import userImg from '../images/user.png';
import ROLE from '../types/Role';

type Option = {
    label: string;
    value: ROLE;
};

const options: Option[] = [
    {
        label: 'Chattare',
        value: ROLE.USER,
    },
    {
        label: 'Moderator',
        value: ROLE.MOD,
    },
    {
        label: 'Admin',
        value: ROLE.ADMIN,
    },
];

/**
 * Makes Admin able to create users.
 * @returns HTML for creating a user.
 */
const UserCreation: React.FC = () => {
    const [username, setUserName] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [userRole, setUserRole] = useState<string>(ROLE.USER);

    const navigate = useNavigate();

    const handleUserName = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserName(e.target.value);
    };

    const handleUserPassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserPassword(e.target.value);
    };
    const handleUserRole = (e: ChangeEvent<HTMLSelectElement>): void => {
        setUserRole(e.target.value);
    };

    const handleOnSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        const userService = new UserService();
        const data = {
            username,
            password: userPassword,
            role: userRole,
            active: true,
        };

        await userService.create(data);
        navigate('/admin');
    };

    return (
        <div className="bg-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="max-w-xs w-full m-auto bg-gray-100 rounded p-5">
                <header>
                    <img
                        className="w-20 mx-auto mb-5"
                        alt={userImg}
                        src={userImg}
                    />
                </header>
                <form onSubmit={handleOnSubmit}>
                    <div>
                        <label
                            className="block mb-2 text-indigo-500"
                            htmlFor="username"
                        >
                            Username
                            <input
                                onChange={handleUserName}
                                className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                                type="text"
                                id="username"
                            />
                        </label>
                    </div>
                    <div>
                        <label
                            className="block mb-2 text-indigo-500"
                            htmlFor="password"
                        >
                            Password
                            <input
                                onChange={handleUserPassword}
                                className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                                type="password"
                                id="password"
                            />
                        </label>
                    </div>
                    <div>
                        <label
                            className="block mb-2 text-indigo-500"
                            htmlFor="role"
                        >
                            Role
                            <select
                                id="role"
                                onChange={handleUserRole}
                                className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                            >
                                {options.map((option: Option) => (
                                    <option value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <input
                            className="w-full bg-indigo-700 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-6 rounded"
                            value="Create User"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserCreation;
