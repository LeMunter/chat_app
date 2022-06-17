import { Context } from 'koa';
import UserService from '../services/user-service';
import { createToken } from '../utils/jwt-helper';

export default class AuthController {
    private userService: UserService = new UserService();

    public async login(ctx: Context): Promise<void> {
        try {
            const { username, password } = ctx.request.body;

            const userModel = await this.userService.validateLogin(
                username,
                password
            );
            const token = await createToken({
                id: userModel.id,
                role: userModel.role,
                username: userModel.username
            });

            ctx.body = {
                token,
                id: userModel.id,
                username: userModel.username,
                role: userModel.role
            };
        } catch (error) {
            console.error(error);
        }
    }

    public async authenticate(ctx: Context): Promise<void> {
        try {
            ctx.body = {
                username: ctx.user.username,
                id: ctx.user.id,
                role: ctx.user.role
            };
        } catch (error) {
            console.error(error);
        }
    }
}
