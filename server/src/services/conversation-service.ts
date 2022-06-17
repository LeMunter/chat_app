import sequelize from '../db/postgres';
import Conversation, { ConversationCreationAttributes } from '../models/conversation';
import User from '../models/user';
import { RespondUser } from '../types/respond-types';
import UserService from './user-service';

export default class ConversationService {
    private conversation;

    private userService = new UserService();

    constructor(C?: Conversation) {
        this.conversation = C ? C : Conversation;
    }

    public async createConversation(conversation: ConversationCreationAttributes): Promise<Conversation> {
        const conversations: Conversation[] = await this.conversation.findAll();

        let conversationAlreadyExists = false;
        let foundConversation: Conversation; 

        for (const conv of conversations) {
            const currentConvCount = conv.user_ids.length;
            let counter = 0;

            for (const newConvUser of conversation.user_ids) {
                for (const u of conv.user_ids) {
                    if (newConvUser === u) {
                        counter++;
                    }
                }
            }
            if (currentConvCount === counter) {
                foundConversation = conv;
                conversationAlreadyExists = true;
            }
        }

        if (conversationAlreadyExists && foundConversation) {
            return foundConversation;
        }

        return this.conversation.create(conversation);
    }

    public async addMessage(convoID: number, messageID: number): Promise<Conversation> {
        const conversation = await this.get(convoID);

        return conversation.update({
            ...conversation,
            message_ids: sequelize.fn('array_append', sequelize.col('message_ids'), messageID)
        });
    }

    public async get(conID: number): Promise<Conversation> {
        return this.conversation.findOne({ where: { id: conID } }); 
    }

    public async getUserConversations(userID: number): Promise<Conversation[]> {
        const allConversations: Conversation[] = await this.conversation.findAll();
        return allConversations.filter((con: Conversation) => con.user_ids.includes(userID));
    }

    public async getAll(): Promise<Conversation[]> {
        return await this.conversation.findAll();
    }
    /*  public async getConversationMessages(roomID: number): Promise<Message[]> {
        return this.conversation.findAll({ where: { room_id: roomID } });
    }

    public async updateMsg(msgId: number, newMsg: string) {
        const msgUpdate = await this.get(msgId);

        return msgUpdate.update({
            ...msgUpdate,
            message: newMsg
        });
    }*/
        
    public async removeMessage(convoID: number, messageID: number): Promise<Conversation> {
        const conversation = await this.get(convoID);

        return conversation.update({
            ...conversation,
            message_ids: sequelize.fn('array_remove', sequelize.col('message_ids'), messageID)
        });
    }
    
    public async getConvoUsers(conId: number): Promise<RespondUser[]> {
        const convo = await this.conversation.findOne({ where: { id: conId } });
        const users = await this.userService.getAll();
        const user = users.filter((user: User) => convo.user_ids.includes(user.id));
        return user;
    }
}