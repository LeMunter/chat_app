import sequelize from '../db/postgres';
import Chatroom, { ChatroomCreationAttributes } from '../models/chatroom';
import User from '../models/user';
import { RespondUser } from '../types/respond-types';
import UserService from './user-service';

export default class ChatRoomService {
    private chatroom;

    private userService = new UserService();

    constructor(R?: Chatroom) {
        this.chatroom = R ? R : Chatroom;
    }
    
    public async create(chatroom: ChatroomCreationAttributes): Promise<Chatroom> {
        return this.chatroom.create(chatroom);
    }

    public async get(id: number): Promise<Chatroom> {
        return this.chatroom.findOne({ where: { id: id } });
    }

    public async getAll(): Promise<Chatroom[]> {
        return this.chatroom.findAll();
    }

    public async getChatroomUsers(id: number): Promise<RespondUser[]> {
        const room = await this.chatroom.findOne({ where: { id: id } });
        const users = await this.userService.getAll();
        const user = users.filter((user: User) => room.user_ids.includes(user.id));
        return user;
    }

    public async delete(roomID: number): Promise<number> {
        return this.chatroom.destroy({ where: { id: roomID } });
    }

    public async update(roomID: number, updates: Chatroom) {
        const room = await this.get(roomID);

        return room.update({
            ...room,
            ...updates
        });
    }

    public async updateName(roomID: number, name: string): Promise<Chatroom> {
        const room = await this.get(roomID);
        return await room.update({
            ...room,
            name: name
        });
    }

    public async updateIsPublic(roomID: number, is_public: boolean): Promise<Chatroom> {
        const room = await this.get(roomID);
        return await room.update({
            ...room,
            is_public: is_public
        });
    }

    public async updateTags(roomID: number, newTags: string[]): Promise<Chatroom> {
        const room = await this.get(roomID);
        return await room.update({
            ...room,
            tags: newTags
        });
    }

    public async addUser(roomID: number, userID: number): Promise<Chatroom> {
        const room = await this.get(roomID);

        if (room.user_ids.includes(userID)) {
            return room;
        }

        return room.update({
            ...room,
            user_ids: sequelize.fn('array_append', sequelize.col('user_ids'), userID)
        });
    }

    public async addMessage(roomID: number, messageID: number): Promise<Chatroom> {
        const room = await this.get(roomID);
        return room.update({
            ...room,
            message_ids: sequelize.fn('array_append', sequelize.col('message_ids'), messageID)
        });
    }
    
    public async removeMessage(roomID: number, messageID: number): Promise<Chatroom> {
        const room = await this.get(roomID);

        return room.update({
            ...room,
            message_ids: sequelize.fn('array_remove', sequelize.col('message_ids'), messageID)
        });
    }
}
