import { Socket } from 'socket.io';

export default class SocketRooms {
    private _dms: Map<string, Set<number>> = new Map<string, Set<number>>();
    private _rooms: Map<string, Set<number>> = new Map<string, Set<number>>();

    get rooms () {
        return this._rooms;
    }

    get dms () {
        return this._dms;
    }

    public addRoom(socketRoom: string, users: Set<number>, isDM: boolean) {
        if (isDM) {
            this._dms.set('dm_' + socketRoom, users);
        } else {
            this._rooms.set('rm_' + socketRoom, users);
        }
    }
    
    public hasRoom(room_id: string, isDM: boolean) {
        return isDM ? this._dms.has(room_id) : this._rooms.has(room_id);
    }
    
    public joinRooms(userID: number, socket: Socket) {
        this.joinSocketRooms(userID, socket, this._dms);
        this.joinSocketRooms(userID, socket, this._rooms);
    }

    private joinSocketRooms(userID: number, socket: Socket, roomList: Map<string, Set<number>>) {
        for (const room of roomList) {
            const users = room[1];
            const roomName = room[0];

            console.log(userID, users);
            console.log(users.has(userID));
            if(users.has(userID)){
                socket.join(roomName);
                console.log(`User: ${userID} joined room: ${roomName}`);
            }
        }
    }
}