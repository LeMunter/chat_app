import { Context, Next } from 'koa';
import Router, { IMiddleware } from 'koa-router';
import ChatroomController from '../controllers/chatroom-controller';
import AuthMiddleware from '../middlewares/auth-middleware';

export default class ChatroomRouter {
    private _router: Router = new Router();
    private controller: ChatroomController = new ChatroomController();
    private middleware: AuthMiddleware = new AuthMiddleware();

    constructor() {
        this.initializeRoutes();
    }

    public get router(): IMiddleware<any, unknown> {
        return this._router.routes();
    }

    private initializeRoutes(): void {
        this._router.post(
            '/',
            (ctx: Context, next: Next) =>
                this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context, next: Next) =>
                this.middleware.requesterHasAdminRights(ctx, next),
            (ctx: Context) => this.controller.add(ctx)
        );

        this._router.get(
            '/',
            (ctx: Context, next: Next) =>
                this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.getAll(ctx)
        );

        this._router.get(
            '/:id',
            (ctx: Context, next: Next) =>
                this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.get(ctx)
        );

        this._router.delete(
            '/:id',
            (ctx: Context, next: Next) =>
                this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context, next: Next) =>
                this.middleware.requesterHasAdminRights(ctx, next),
            (ctx: Context) => this.controller.remove(ctx)
        );

        this._router.put(
            '/:id',
            (ctx: Context, next: Next) =>
                this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context, next: Next) =>
                this.middleware.requesterHasAdminRights(ctx, next),
            (ctx: Context) => this.controller.update(ctx)
        );

        this._router.post('/:id/join', 
            (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.joinRoom(ctx)
        );

        // Message specific
        this._router.get('/:id/message',
            (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.getAllMessages(ctx)
        );
    
        this._router.post('/:id/message',
            (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.addMessage(ctx)
        );
    
        this._router.delete('/:id/message/:msg_id',
            (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.removeMessage(ctx)
        );
            
        this._router.put('/:id/message/:msg_id',
            (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.updateMessage(ctx)
        );
        
        // Users in chatroom
        this._router.get(
            '/:id/user',
            (ctx: Context, next: Next) =>
                this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.getChatroomUsers(ctx)
        );
    }
}
