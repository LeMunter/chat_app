import { Context, Next } from 'koa';
import Router, { IMiddleware } from 'koa-router';
import UserController from '../controllers/user-controller';
import AuthMiddleware from '../middlewares/auth-middleware';
import UserMiddleware from '../middlewares/user-middleware';

export default class UserRouter {
    private _router: Router = new Router();
    private controller: UserController = new UserController();
    private authMiddleware: AuthMiddleware = new AuthMiddleware();
    private userMiddleware: UserMiddleware = new UserMiddleware();

    constructor() {
        this.initializeRoutes();
    }

    public get router(): IMiddleware<any, unknown> {
        return this._router.routes();
    }

    private initializeRoutes(): void {
        this._router.get(
            '/:id',

            (ctx: Context, next: Next) =>
                this.authMiddleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.get(ctx)
        );

        this._router.get(
            '/',
            (ctx: Context, next: Next) =>
                this.authMiddleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.getAll(ctx)
        );

        this._router.post(
            '/',
            (ctx: Context, next: Next) =>
                this.userMiddleware.requestHasValidParams(ctx, next),
            /*  (ctx: Context, next: Next) => this.authMiddleware.requestHasValidToken(ctx, next),
            (ctx: Context, next: Next) => this.authMiddleware.requesterHasAdminRights(ctx, next), */
            (ctx: Context) => this.controller.add(ctx)
        );

        this._router.delete(
            '/:id',
            (ctx: Context, next: Next) =>
                this.authMiddleware.requestHasValidToken(ctx, next),
            // (ctx: Context, next: Next) => this.authMiddleware.requesterHasAdminRights(ctx, next),
            (ctx: Context) => this.controller.remove(ctx)
        );
        this._router.put(
            '/:id',
            (ctx: Context, next: Next) =>
                this.authMiddleware.requestHasValidToken(ctx, next),
            (ctx: Context, next: Next) =>
                this.authMiddleware.requesterHasAdminRights(ctx, next),
            (ctx: Context) => this.controller.update(ctx)
        );
    }
}
