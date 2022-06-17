import Koa, { Context, Next } from 'koa';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import IndexRouter from './routes/index-router';
import { Server as ServerCreate, createServer } from 'http'; // ServerCreate är hittepå bara för att inte krocka med server
import SocketEvents from './utils/socket-events';

export default class Server {
    private app: Koa;
    private socketEvents: SocketEvents;
    private indexRouter: IndexRouter = new IndexRouter();
    private port: number | string;
    private appServer: ServerCreate;

    constructor(port: number | string) {
        this.app = new Koa();
        this.port = port;
        this.appServer = createServer(this.app.callback());
        this.socketEvents = new SocketEvents(this.appServer);
    }

    public run(): void {
        this.setUp();
        this.app.use(this.indexRouter.router.routes());
        this.app.use(this.indexRouter.router.allowedMethods());
        this.listen();
    }

    private setUp(): void {
        this.app.use(bodyParser());
        this.app.use(cors({ origin: '*' }));
        this.app.use(logger());
        this.app.use((ctx: Context, next: Next) => {
            ctx.state.io = this.socketEvents.io;
            ctx.state.socketServices = this.socketEvents._socketServices;
            return next();
        });
    }

    private listen(): void {
        this.appServer.listen(this.port, async () => {
            console.log(`Server listening on port: ${this.port}`);
        }).on('error', (err: Error) => {
            console.error(err);
        });
    }
}

