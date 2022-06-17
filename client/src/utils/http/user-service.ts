import { instance } from './axios';
import type { User, NewUser } from '../../types/User';

class UserService {
    private http = instance();

    async getAll(): Promise<User[]> {
        return (await this.http.get<User[]>('/user')).data;
    }

    async get(id: number): Promise<User> {
        return (await this.http.get<User>(`/user/${id}`)).data;
    }

    async create(data: NewUser): Promise<any> {
        return (await this.http.post<any>('/user', data)).data;
    }

    async update(data: User, id: number): Promise<any> {
        return this.http.put<any>(`/user/${id}`, data);
    }

    async delete(id: number): Promise<any> {
        return this.http.delete<any>(`/user/${id}`);
    }
}

export default UserService;
