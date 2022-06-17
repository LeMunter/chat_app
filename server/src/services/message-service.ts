import Message, { MessageCreationAttributes } from '../models/message';

export default class MessageService {
    private message;
    
    constructor(M?: Message) {
        this.message = M ? M : Message;
    }

    public async create(msg: MessageCreationAttributes): Promise<Message> {
        return this.message.create(msg);
    }

    public async get(msgID: number): Promise<Message> {
        return this.message.findOne({ where: { id: msgID } });
    }

    public async updateMsg(msgId: number, newMsg: string) {
        const msgUpdate = await this.get(msgId);

        return msgUpdate.update({
            ...msgUpdate,
            message: newMsg
        });
    }

    public async delete(messageID: number): Promise<number> {
        return this.message.destroy({ where: { id: messageID } });
    }
}