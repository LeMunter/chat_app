import React, { useContext, useEffect, useRef, useState } from 'react';
import Message from './Message';
import { HomeContext } from '../../context/HomeProvider';
import { AuthContext } from '../../context/AuthProvider';
import { SocketContext } from '../../context/SocketProvider';
import { Conversation } from '../../types/Conversation';
import ChatroomUserList from '../sidebar/ChatroomUserList';
import MessageService from '../../utils/http/message-service';
import type { Message as MessageType } from '../../types/Message';
import { Chatroom } from '../../types/Chatroom';

const ChatRoom: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const { connectUser, socket } = useContext(SocketContext);
    const { activeChat } = useContext(HomeContext);
    const { user } = useContext(AuthContext);
    const enterPressRef = useRef<any>();
    const messageRef = useRef<any>();
    const messagesEndRef = useRef<any>();

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    };

    useEffect(() => {
        (async () => {
            if (activeChat) {
                let resMessages;
                const messageService = new MessageService();
                if (activeChat.type === 'chatroom') {
                    resMessages = await messageService.getAllForRoom(
                        activeChat.id
                    );
                } else {
                    resMessages = await messageService.getAllForDM(
                        activeChat.id
                    );
                }
                
                setMessages(resMessages);
                scrollToBottom();
            }
        })();
    }, [activeChat]);

    useEffect(() => {
        connectUser(user?.id || '');

        socket?.on('room-message', (data: MessageType) => {
            const shouldAddNewMessage =
                Number(data.room_id) === activeChat?.id &&
                activeChat.type === 'chatroom';

            if (shouldAddNewMessage) {
                setMessages((msgs) => [...msgs, data]);
                scrollToBottom();
            }
        });

        socket?.on('direct-message', (data: MessageType) => {
            const shouldAddNewMessage =
                Number(data.room_id) === activeChat?.id &&
                activeChat.type === 'conversation';

            if (shouldAddNewMessage) {
                setMessages((msgs) => [...msgs, data]);
                scrollToBottom();
            }
        });

        socket?.on('room-message-delete', (data: MessageType) => {
            const shouldRemoveMessage =
                Number(data.room_id) === activeChat?.id &&
                activeChat.type === 'chatroom';

            if (shouldRemoveMessage) {
                setMessages((msgs) =>
                    msgs.filter((m: MessageType) => m.id !== Number(data.id))
                );
                scrollToBottom();
            }
        });

        socket?.on('direct-message-delete', (data: MessageType) => {
            const shouldRemoveMessage =
                Number(data.room_id) === activeChat?.id &&
                activeChat.type === 'conversation';

            if (shouldRemoveMessage) {
                setMessages((msgs) =>
                    msgs.filter((m: MessageType) => m.id !== Number(data.id))
                );
                scrollToBottom();
            }
        });

        return () => {
            socket?.off('room-message');
            socket?.off('direct-message');
            socket?.off('room-message-delete');
            socket?.off('direct-message-delete');
            setMessages([]);
        };
    }, [connectUser, socket, user, activeChat]);

    const handleOnSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        if (activeChat && user) {
            const messageService = new MessageService();
            const data = {
                room_id: activeChat?.id,
                user_id: user?.id,
                message: messageRef.current.value,
            };

            if (activeChat.type === 'chatroom') {
                await messageService.sendRoomMessage(data, activeChat?.id);
            } else {
                await messageService.sendDirectMessage(data, activeChat?.id);
            }

            messageRef.current.value = '';
        }
    };

    const removeMessage = async (msg_id: number): Promise<void> => {
        let roomID = 0;
        if (activeChat) {
            roomID = activeChat?.id;
        }
        const messageService = new MessageService();
        await messageService.delete(roomID, msg_id);
        setMessages(messages.filter((msg: MessageType) => msg.id !== msg_id));
    };

    const handleEnter = (e: any): void => {
        if (e.code === 'Enter' && e.shiftKey === false) {
            e.preventDefault();
            handleOnSubmit(e);
        }
    };

    return (
        <div className="relative dynamic-height-chat bg-gray-300 rounded p-5">
            {activeChat && <ChatroomUserList />}
            <ul className="h-4/5 overflow-y-scroll">
                {messages &&
                    messages.map((msg: MessageType) => (
                        <li key={msg.id}>
                            <Message
                                currentUser={user?.id}
                                currentUserRole={user?.role}
                                user_id={msg.user_id}
                                id={msg.id}
                                name={msg.username}
                                message={msg.message}
                                removeMessage={(id: number) =>
                                    removeMessage(id)
                                }
                            />
                        </li>
                    ))}
                <li ref={messagesEndRef} key="bottomscrollreference">
                    {/* I am here to make the chat scroll down! */}
                </li>
            </ul>
            <hr className="my-10" />
            <div className="mb-6 mx-4">
                <form
                    onSubmit={handleOnSubmit}
                    ref={(el: HTMLFormElement) => {
                        enterPressRef.current = el;
                    }}
                >
                    <div className="absolute w-3/4 bottom-0 pb-6">
                        <div className="write bg-white shadow flex rounded-lg">
                            <div className="flex-3 flex content-center items-center text-center p-4 pr-0">
                                <span className="block text-center text-gray-400 hover:text-gray-800">
                                    <svg
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6"
                                    >
                                        <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </div>
                            <div className="flex-1">
                                <textarea
                                    onKeyDown={(e: React.KeyboardEvent) =>
                                        handleEnter(e)
                                    }
                                    ref={messageRef}
                                    name="message"
                                    className="block outline-none py-4 px-4 bg-transparent w-full"
                                    placeholder="Type a message..."
                                />
                            </div>
                            <div className="flex-2 w-32 p-2 flex content-center items-center">
                                <div className="flex-1 text-center">
                                    <span className="text-gray-400 hover:text-gray-800">
                                        <span className="inline-block align-text-bottom">
                                            <svg
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                className="w-6 h-6"
                                            >
                                                <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <button
                                        type="button"
                                        className="bg-blue-400 w-10 h-10 rounded-full inline-block"
                                    >
                                        <span className="inline-block align-text-bottom">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                className="w-4 h-4 text-white"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatRoom;
