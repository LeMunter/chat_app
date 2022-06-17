import bcrypt from 'bcryptjs';
import User, { UserCreationAttributes } from '../models/user';

export default class UserService {
    private SALT_ROUNDS = 10;

    private user;

    constructor(U?: User) {
        this.user = U ? U : User;
    }
    
    public async getAll(): Promise<User[]> {
        return this.user.findAll();
    }

    public async validateLogin(
        username: string,
        password: string
    ): Promise<User> {
        const user = await User.findOne({ where: { username: username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }

        return user;
    }

    public async get(id: number): Promise<User> {
        const user = await this.user.findOne({ where: { id: id } });
        return user;
    }

    public async create(clientUser: UserCreationAttributes): Promise<User> {
        const hashedPassword = await bcrypt.hash(
            clientUser.password,
            this.SALT_ROUNDS
        );

        return this.user.create({
            username: clientUser.username,
            password: hashedPassword,
            role: clientUser.role,
            active: clientUser.active
        });
    }

    public async delete(id: number): Promise<number> {
        return this.user.destroy({ where: { id: id } });
    }

    public async updateUsername(id: number, username: string): Promise<User> {
        const user = await this.get(id);
        return user.update({
            ...user,
            username
        });
    }

    public async updateRole(id: number, role: string): Promise<User> {
        const user = await this.get(id);
        return user.update({
            ...user,
            role
        });
    }

    public async updateActive(id: number, active: boolean): Promise<User> {
        const user = await this.get(id);
        return user.update({
            ...user,
            active
        });
    }
}
