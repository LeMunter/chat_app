import { Context } from 'koa';
import UserService from '../services/user-service';
import ChatRoomService from '../services/chatroom-service';
import User from '../models/user';

export default class UserController {
    private userService = new UserService();
    // private socketServices = new SocketServices();
    private chatroom = new ChatRoomService();

    public async getAll(ctx: Context): Promise<void> {
        try {
            const users = await this.userService.getAll();
            ctx.body = users;
        } catch (e) {
            console.error(e);
        }
    }

    public async add(ctx: Context): Promise<void> {
        try {
            const userCreated = await this.userService.create(ctx.userCreate);

            if (!userCreated) {
                ctx.throw(400, { message: 'failed to create user' });
            }

            const rooms = await this.chatroom.getAll();

            for (const room of rooms) {
                await this.chatroom.addUser(room.id, userCreated.id);
            }

            ctx.state.socketServices.populateRooms();

            ctx.body = { message: 'User created' };
        } catch (e) {
            console.error(e);
        }
    }

    public async get(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const user = await this.userService.get(id);

            if (!user) {
                ctx.throw(400, { message: 'Username was missing in the request' });
            }

            ctx.body = {
                id: user.id,
                username: user.username,
                role: user.role,
                active: user.active
            };
        } catch (e) {
            console.error(e);
        }
    }

    public async remove(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const user = await this.userService.delete(id);

            if (!user) {
                ctx.throw(400, { message: 'Could not delete user...' });
            }

            ctx.body = { message: 'Success' };
        } catch (e) {
            // TODO proper error response, and handling
            const id = ctx.params.id;
            ctx.status = 404;
            ctx.body = { message: 'No user with id ' + id + ' found' };
        }
    }

    public async update(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const { username, role, active } = ctx.request.body;

            let userIsUpdated: User;

            if (username) {
                userIsUpdated = await this.userService.updateUsername(id, username);
            }

            if (role) {
                userIsUpdated = await this.userService.updateRole(id, role);
            }

            if (active) {
                userIsUpdated = await this.userService.updateActive(id, active);
            }

            if (!userIsUpdated) {
                ctx.throw(400, { message: 'Could not update user' });
            }

            ctx.body = { message: 'User updated' };
        } catch (e) {
            // TODO proper error response, and handling
            const id = ctx.params.id;
            ctx.status = 404;
            ctx.body = { message: 'No user with id ' + id + ' found' };
        }
    }
}
