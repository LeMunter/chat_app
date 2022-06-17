import { instance } from './axios';
import type { Conversation, NewConversation } from '../../types/Conversation';

class ConversationService {
    private http = instance();

    async getAll(): Promise<Conversation[]> {
        return (await this.http.get<Conversation[]>('/conversation')).data;
    }

    async get(id: number): Promise<Conversation> {
        return (await this.http.get<Conversation>(`/conversation/${id}`)).data;
    }

    async create(data: NewConversation): Promise<any> {
        return (await this.http.post<any>('/conversation', data)).data;
    }

    async update(data: Conversation, id: number): Promise<any> {
        return (await this.http.put<any>(`/conversation/${id}`, data)).data;
    }

    async delete(id: number): Promise<any> {
        return (await this.http.delete<any>(`/conversation/${id}`)).data;
    }

    async getConvoUsers(id: number): Promise<any> {
        return (await this.http.get<any>(`/conversation/${id}/user`)).data;
    }
}

export default ConversationService;
