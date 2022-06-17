export default class SocketUsers {
    private _users: Map<number, string> = new Map<number, string>();
    
    public addUser(userID: number) {
        this._users.set(userID, null);
    }

    public userExists(userID: number) {
        return this._users.has(userID);
    }

    public getOnlineUsers() {
        const onlineUsers = [];

        for (const user of this._users) {
            if (user[1] !== null) {
                onlineUsers.push(user[0]);
            }
        }

        return onlineUsers;
    }

    public connectUser(userID: number, socketID: string) {
        this._users.set(userID, socketID);
        return userID;
    }

    public disconnectUser(socketID: string) {
        let disconnectedUser;
        for (const user of this._users.entries()) {
            user[1] === socketID;
            disconnectedUser = user[0];
            this._users.set(user[0], null);
            return disconnectedUser;
        }
    }

    public get users() {
        return this._users.keys();
    }
}