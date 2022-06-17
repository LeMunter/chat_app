import Router from 'koa-router';
import UserRouter from './user-router';
import ChatroomRouter from './chatroom-router';
import AuthRouter from './auth-router';
import ConversationRouter from './conversation-router';

export default class IndexRouter {
    private _router: Router = new Router();
    private userRouter: UserRouter = new UserRouter();
    private chatroomRouter: ChatroomRouter = new ChatroomRouter();
    private authRouter: AuthRouter = new AuthRouter();
    private convRouter: ConversationRouter = new ConversationRouter();

    constructor() {
        this.initializeRoutes();
    }
    
    public get router(): Router {
        return this._router;
    }
    
    private initializeRoutes(): void {
        this._router.use('/api/user', this.userRouter.router);
        this._router.use('/api/room', this.chatroomRouter.router);
        this._router.use('/api/auth', this.authRouter.router);
        this._router.use('/api/conversation', this.convRouter.router);
    }
}