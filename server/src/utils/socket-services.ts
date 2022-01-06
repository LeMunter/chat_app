import { Server as SocketServer, Socket } from 'socket.io';
import Conversation from '../services/conversation-service';
import Message from '../models/message';
import ChatRoom from '../services/chatroom-service';
import UserService from '../services/user-service';
import { EventLogin } from '../types/event-data-types';
import SocketRooms from './socket-rooms';
import SocketUsers from './socket-users';

export default class SocketServices {
    private socketRooms: SocketRooms = new SocketRooms();
    private onlineUsers: SocketUsers = new SocketUsers();
    private chatRooms: ChatRoom = new ChatRoom();
    private conversations: Conversation = new Conversation();
    private userService: UserService = new UserService();

    public async populateRooms() {
    // Fetch rooms with user from db
        const rooms = await this.chatRooms.getAll();
        const dms = await this.conversations.getAll();
        const users = await this.userService.getAll();

        if (rooms) {
            for (const room of rooms) {
                this.socketRooms.addRoom(room.id.toString(), new Set(room.user_ids), false);
                console.log(this.socketRooms.rooms.size, 'rumstorlek');
                console.log(room.user_ids);
                console.log(`Adding room: ${room.id}`);
            }
        }

        if (dms) {
            for (const dm of dms) {
                this.socketRooms.addRoom(dm.id.toString(), new Set(dm.user_ids), true);
                console.log("Adding dm for users: " + dm.user_ids.join(', '));
            }
        }

        if (users) {
            for (const user of users) {
                console.log(`Adding user: ${user.id}`);
                this.onlineUsers.addUser(user.id);
            }
        }
    }

    public handleUserConnect(data: EventLogin, socket: Socket) {
        const userID = this.onlineUsers.connectUser(data.user_id, socket.id);
        console.log('User: ' + userID + ' is now online');

        this.socketRooms.joinRooms(data.user_id, socket);
        this.logOnlineUsers();
    }

    public async handleChatMessage(
        roomId: number,
        message: Message,
        io: SocketServer,
        isDM: boolean
    ): Promise<void> {
        const roomString = isDM ? "dm_":  "rm_";
        const fixedRoomID = roomString + roomId; 
       

        if (this.socketRooms.hasRoom(fixedRoomID, isDM)) {
            console.log(`Sending message: ${message.message} to room: ${fixedRoomID}`);
            io.in(`${fixedRoomID}`).emit('room-message', {
                message: message.message,
                username: (await this.userService.get(message.user_id)).username,
                room_id: roomId,
                id: message.id,
                user_id: message.user_id
            });
        }
    }

    public handleUserDisconnect(socket: Socket) {
        const disconnectedUser = this.onlineUsers.disconnectUser(socket.id);

        console.log('User ' + disconnectedUser + ' went offline!');

        this.logOnlineUsers();
    }

    // public handleJoinRoom(data: EventJoinRoom, socket: Socket): void {
    //     const room = this.rooms.find((r: any) => r.room_id === data.room_id);
    //     console.log(room);
    //     console.log(data);
    //     if (room) {
    //         console.log(`User: ${data.user_id} joined room: ${data.room_id}`);
    //         socket.join(room.room_id);
    //         socket.to(room.room_id).emit('room-message', { username: data.user_id, message: 'Welcome' });
    //     } 
    // }

    private logOnlineUsers() {
        console.log('All users online');
        const onlineUsers = this.onlineUsers.getOnlineUsers();

        for (const user of onlineUsers) {
            console.log(user);
        }
    }
}
