import { Context, Next } from 'koa';
import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import { TokenPayload } from '../types/token-payload';

export default class AuthMiddleware {
    public async requestIncludesUsername(ctx: Context, next: Next) {
        if (!ctx.request.body.username) {
            ctx.throw(400, { message: 'Username was missing in the request' });
        }
        await next();
    }

    public async requestIncludesPassword(ctx: Context, next: Next) {
        if (!ctx.request.body.password) {
            ctx.throw(400, { message: 'Password was missing in the request' });
        }
        await next();
    }

    public async requesterHasAdminRights(ctx: Context, next: Next) {
        console.log('Auth middleware: ' + ctx.user);
        if (ctx.user.role !== 'admin') {
            ctx.throw(401, { message: 'Unauthorized', role: ctx.user.role });
        }

        await next();
    }

    public async requestHasValidToken(ctx: Context, next: Next) {
        if (!ctx.headers.authorization) {
            ctx.throw(401, { message: 'Token is missing' });
        }

        const authorization = ctx.headers.authorization.split(' ');

        if (authorization[0] !== 'Bearer') {
            ctx.throw(401, { message: 'Wrong format on headers' });
        }

        const publicKey = await fs.promises.readFile('./public.pem');

        try {
            const payload = jwt.verify(authorization[1], publicKey) as TokenPayload;

            ctx.user = payload;
        } catch (error) {
            console.log(error);
            ctx.throw(403, { message: 'Whoopsidooopsi something went wrong!' });
        }
        await next();
    }
}
