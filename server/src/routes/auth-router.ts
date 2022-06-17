import { Context, Next } from 'koa';
import Router, { IMiddleware } from 'koa-router';
import AuthController from '../controllers/auth-controller';
import AuthMiddleware from '../middlewares/auth-middleware';

export default class AuthRouter {
    private _router: Router = new Router();
    private controller: AuthController = new AuthController();
    private middleware: AuthMiddleware = new AuthMiddleware();

    constructor() {
        this.initializeRoutes();
    }

    public get router(): IMiddleware<any, unknown> {
        return this._router.routes();
    }

    private initializeRoutes(): void {
        this._router.post('/login',
            (ctx: Context, next: Next) => this.middleware.requestIncludesUsername(ctx, next),
            (ctx: Context, next: Next) => this.middleware.requestIncludesPassword(ctx, next),
            (ctx: Context) => this.controller.login(ctx)
        );

        this._router.post('/authenticate', 
            (ctx: Context, next: Next) => this.middleware.requestHasValidToken(ctx, next),
            (ctx: Context) => this.controller.authenticate(ctx)
        );
    }
}