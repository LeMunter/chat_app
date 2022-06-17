import { Server as ServerCreate } from 'http'; // ServerCreate är hittepå bara för att inte krocka med server
import { Server as SocketServer, Socket } from 'socket.io';
import { EventLogin } from '../types/event-data-types';
import SocketServices from './socket-services';

export default class SocketEvents {
    private socketServices = new SocketServices();
    private createServer: ServerCreate;
    private _io: SocketServer;

    constructor(createServer: ServerCreate) {
        this.createServer = createServer;
        this.initializeConnection();
    }
    get io () {
        return this._io;
    }

    get _socketServices(): SocketServices {
        return this.socketServices;
    }

    public initializeConnection() {
        this._io = new SocketServer(this.createServer, {
            cors: {
                origin: '*'
            }
        });

        this._io.attach(this.createServer);
        this._io.on('connection', async (socket: Socket) => {
            await this.socketServices.populateRooms();
            this.initializeEvents(socket);
        });

    }

    private initializeEvents(socket: Socket) {
        console.log('Socket is online :)..');

        socket.on('user-connect', (data: EventLogin) =>
            this.socketServices.handleUserConnect(data, socket)
        );
        socket.on('disconnect', () =>
            this.socketServices.handleUserDisconnect(socket)
        );
        // socket.on('join-room', (data: EventJoinRoom) =>
        //     this.socketServices.handleJoinRoom(data, socket)
        // );
        // socket.on('chat-message', (data: EventChatMessage) =>
        //     this.socketServices.handleChatMessage(data.room_id, data, this._io)
        // );
        socket.on('room-message', () => console.log('rooom'));
    }
}
