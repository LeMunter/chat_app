import '../App.css';
import React, { FormEvent, useContext, useRef, useState } from 'react';
import chatImg from '../images/chat.png';
import { AuthContext } from '../context/AuthProvider';
import { LoginUser } from '../types/User';

/**
 * Login form for users.
 * @returns HTML for login form.
 */
const Login: React.FC = () => {
    const username = useRef() as React.MutableRefObject<HTMLInputElement>;
    const password = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [invalidLoginMessage, setInvalidLoginMessage] = useState('');

    const { login } = useContext(AuthContext);

    const handleOnSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const loginUser: LoginUser = {
            password: password.current.value,
            username: username.current.value,
        };

        const loginAttempt = await login(loginUser);
        if (loginAttempt === false) {
            setInvalidLoginMessage('Invalid username or password!');
        }
    };

    return (
        <div className="red-600 ">
            <div className="max-w-xs w-full m-auto red-100 rounded p-5">
                <header>
                    <img
                        className="w-20 mx-auto mb-5"
                        alt={chatImg}
                        src={chatImg}
                    />
                    <h3 className="block mb-2 text-pink-800">Login</h3>
                </header>
                <form onSubmit={handleOnSubmit}>
                    <label
                        className="block mb-2 text-pink-500"
                        htmlFor="username"
                    >
                        Username
                        <input
                            ref={username}
                            placeholder="Enter Username"
                            className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-500 outline-none focus:bg-gray-300"
                            type="text"
                            id="username"
                        />
                    </label>
                    <label
                        className="block mb-2 text-pink-500"
                        htmlFor="password"
                    >
                        Password
                        <input
                            ref={password}
                            placeholder="Enter Password"
                            className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-500 outline-none focus:bg-gray-300"
                            type="password"
                            id="password"
                        />
                    </label>
                    <button
                        type="submit"
                        className="w-full red-700 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-6 rounded"
                    >
                        Submit
                    </button>
                </form>
                <h3 className="text-pink-800">{invalidLoginMessage}</h3>
            </div>
        </div>
    );
};

export default Login;
