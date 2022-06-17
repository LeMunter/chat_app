import { Context, Next } from 'koa';
import Router, { IMiddleware } from 'koa-router';
import ConversationController from '../controllers/conversation-controller';
import AuthMiddleware from '../middlewares/auth-middleware';

export default class ConversationRouter {
    private _router: Router = new Router();
    private controller: ConversationController = new ConversationController();
    private middleware: AuthMiddleware = new AuthMiddleware();

    constructor() {
        this.initializeRoutes();
    }

    public get router(): IMiddleware<any, unknown> {
        return this._router.routes();
    }

    private initializeRoutes(): void {
        // Conversation specific
        this._router.get('/',
            (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.getAll(ctx)
        );

        this._router.get('/:id',
            (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.get(ctx)
        );

        this._router.post('/',
            (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.add(ctx)
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
        this._router.get('/:id/user',
            (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.getConvoUsers(ctx)
        );
    }
}