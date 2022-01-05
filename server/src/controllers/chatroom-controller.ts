import { Context } from 'koa';
import SocketServices from '../utils/socket-services';
import ChatRoomService from '../services/chatroom-service';
import UserService from '../services/user-service';
import User from '../models/user';
import Chatroom, { ChatroomCreationAttributes } from '../models/chatroom';
import { RespondMessage } from '../types/respond-types';
import MessageService from '../services/message-service';
import { MessageCreationAttributes } from '../models/message';

export default class ChatroomController {
    readonly table = 'chatroom';
    private socketServices: SocketServices = new SocketServices();
    private chatroomService = new ChatRoomService();
    private userService = new UserService();
    private messageService = new MessageService();
    
    public async add(ctx: Context): Promise<void> {
        try {
            const { name, is_public, tags } = ctx.request.body;
            
            console.log(name, is_public, tags);
            
            if (!name || !is_public || !tags) {
                console.log('Can not create chatroom, faulty body.');
            }
            
            const userService = new UserService();
            const users = (await userService.getAll()).map((u: User) => u.id);
            
            const room: ChatroomCreationAttributes = {
                name: name,
                is_public: is_public,
                tags: [...tags],
                user_ids: users,
                message_ids: []
            };
            
            const roomCreated = await this.chatroomService.create(room);
            
            if (!roomCreated) {
                ctx.throw(400, { message: 'Failed to create room' });
            }
            
            await this.socketServices.populateRooms();
            
            ctx.body = { message: 'Room created', room };
        } catch (e) {
            console.error(e);
        }
    }
    
    public async getAll(ctx: Context): Promise<void> {
        try {
            const chatroom = await this.chatroomService.getAll();
            ctx.body = chatroom;
        } catch (e) {
            console.error(e);
        }
    }
    
    public async get(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const room = await this.chatroomService.get(id);
            
            ctx.body = room;
        } catch (e) {
            console.error(e);
        }
    }

    public async getChatroomUsers(ctx: Context): Promise<void> {
        try{
            const id = ctx.params.id;
            const usersInRoom = await this.chatroomService.getChatroomUsers(id);
            ctx.body = usersInRoom;
        } catch (e) {
            console.error(e);
        }
    }

    public async remove(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const roomDeleted = await this.chatroomService.delete(id);
            
            if (!roomDeleted) {
                ctx.throw(400, { message: 'Failed to delete room' });
            }
            
            ctx.body = { message: 'Room deleted' };
        } catch (e) {
            console.error(e);
        }
    }
    
    public async update(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const { newTag, userID } = ctx.request.body;
            
            let updatedRoom: Chatroom;
            
            if (newTag) {
                updatedRoom = await this.chatroomService.addTag(id, newTag);
            }
            
            if (userID) {
                updatedRoom = await this.chatroomService.addUser(id, userID);
            }

            if (!updatedRoom) {
                ctx.throw(400, { message: 'Failed to update room' });
            }
            
            ctx.body = { message: 'Room updated' };
        } catch (e) {
            const id = ctx.params.id;
            ctx.status = 404;
            ctx.body = { message: 'No chatroom with id ' + id + ' found' };
        }
    }

    public async getAllMessages(ctx: Context): Promise<void> {
        try {
            
            const id = ctx.params.id;
            
            const chatroom = await this.chatroomService.get(id);
            const message_ids = chatroom.message_ids;
            
            const messages: RespondMessage[] = [];
            
            for (const message_id of message_ids) {
                const msg = await this.messageService.get(message_id);
                messages.push({
                    id: msg.id,
                    message: msg.message,
                    user_id: msg.user_id,
                    username: (await this.userService.get(msg.user_id)).username,
                    createdAt: msg.createdAt
                });
            }
            
            ctx.body = messages;
        } catch (e) {
            console.log(e);
        }
    }

    public async updateMessage(ctx: Context): Promise<void> {
        try {
            // const id = ctx.params.id;
            const msg_id = ctx.params.msg_id;
            const msg = ctx.request.body;

            const messageUpdate = await this.messageService.updateMsg(msg_id, msg);

            if(!messageUpdate) {
                ctx.throw(400, 'Failed to delete message');
            }
            ctx.body = { message: 'Message deleted' };
        } catch (e) {
            console.log(e);
        }
    }

    public async removeMessage(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const msg_id = ctx.params.msg_id;
            
            await this.chatroomService.removeMessage(id, msg_id);
            const messageDeleted = await this.messageService.delete(id);
            
            if(!messageDeleted) {
                ctx.throw(400, 'Failed to delete message');
            }
            
            ctx.body = { message: 'Message deleted' };
        } catch (e) {
            console.log(e);
        }
    }
    
    public async addMessage(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const { message, user_id }: MessageCreationAttributes = ctx.request.body;

            if (!message || !user_id) {
                console.log('Can not create message, faulty body');
            }

            const msg: MessageCreationAttributes = {
                message: message,
                user_id: user_id
            };

            const messageCreated = await this.messageService.create(msg);

            if (!messageCreated) {
                ctx.throw(400, { message: 'Failed to create message' });
            }

            await this.chatroomService.addMessage(id, messageCreated.id);

            ctx.body = { message: 'Message created', msg };
        } catch (e) {
            console.log(e);
        }
    }
}
