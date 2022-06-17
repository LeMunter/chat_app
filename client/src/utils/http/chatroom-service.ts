import { instance } from './axios';
import type { Chatroom, NewChatroom } from '../../types/Chatroom';
import type { User } from '../../types/User';

class ChatroomService {
    private http = instance();

    async getAll(): Promise<Chatroom[]> {
        return (await this.http.get<Chatroom[]>('/room')).data;
    }

    async get(id: number): Promise<Chatroom> {
        return (await this.http.get<Chatroom>(`/room/${id}`)).data;
    }

    async getChatroomUsers(id: number): Promise<User[]> {
        return (await this.http.get<User[]>(`room/${id}/user`)).data;
    }

    async create(data: NewChatroom): Promise<any> {
        return (await this.http.post<any>('/room', data)).data;
    }

    async update(data: Chatroom, id: number): Promise<any> {
        return (await this.http.put<any>(`/room/${id}`, data)).data;
    }

    async delete(id: number): Promise<any> {
        return (await this.http.delete<any>(`/room/${id}`)).data;
    }
}

export default ChatroomService;
