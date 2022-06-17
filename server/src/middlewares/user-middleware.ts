import { Context, Next } from 'koa';
import { RequestUserCreate } from '../types/request-types';

export default class UserMiddleware {
    public async requestHasValidParams(ctx: Context, next: Next) {
        if (!ctx.request.body.username) {
            ctx.throw(400,{ message: 'Username was missing in the request' });
        }

        if (!ctx.request.body.password) {
            ctx.throw(400,{ message: 'password was missing in the request' });
        }

        if (!ctx.request.body.role) {
            ctx.throw(400,{ message: 'role was missing in the request' });
        }

        const userCreate: RequestUserCreate = {
            password: ctx.request.body.password,
            username: ctx.request.body.username,
            role: ctx.request.body.role,
            active: true
        };

        ctx.userCreate = userCreate;

        await next();
    }
}
