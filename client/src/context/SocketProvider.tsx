import { io, Socket } from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';
import config from '../config';
import { printToConsole } from '../utils/console-printer';

const { BASE_URL, SOCKET_PATH } = config;

type SocketContextState = {
    socket?: Socket;
    connectUser: (userID: number | string) => void;
    sendMessage: (
        room_id: number,
        user_id: number,
        message: string,
        username: string
    ) => void;
};

const initialState: SocketContextState = {
    connectUser: (): void => {},
    sendMessage: (): void => {},
};

export const SocketContext = createContext<SocketContextState>(initialState);

type SocketProviderProps = { children: React.ReactChild[] | React.ReactChild };

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket] = useState(io(BASE_URL, { path: SOCKET_PATH }));

    useEffect(() => {
        socket.on('connect', () =>
            printToConsole(`Socket connected! ID: ${socket.id}`)
        );

        return () => {
            printToConsole(`Socket disconnected! ID: ${socket.id}`);
            socket.disconnect();
        };
    }, [socket]);

    const connectUser = (userID: number | string): void => {
        socket.emit('user-connect', { user_id: userID });
    };

    const sendMessage = (
        room_id: number,
        user_id: number,
        message: string,
        username: string
    ): void => {
        socket.emit('chat-message', { room_id, user_id, message, username });
    };

    /* socket.emit("user-connect", { user_id: user?.id }); */
    /* }); */

    /* socket.emit("join-room", {
            room_id: activeChat?.name,
            user_id: username,
          }); */

    /* socket.on("room-message", (data) => {
          printToConsole(data);
    
          const isUser = data.username === username;
          handleNewMessage({
            isUser,
            name: data.username,
            text: data.message,
            roomID: data.room_id,
          });
        }); */

    return (
        <SocketContext.Provider
            value={{
                socket,
                connectUser,
                sendMessage,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
