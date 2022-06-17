// // Unit test the message service.
import { expect } from 'chai';
import mockMessage from './models/messageMock';
import MessageService from '../../services/message-service';
// import Message from '../../models/message';

const sut = new MessageService(mockMessage);
// const userID = 1;
const msgID = 1;
const newMsg = {
    name: 'a new message',
    message: 'testing new message',
    user_id: 1,
    room_id: 1
};

describe('Message service', () => {
    it('Should return message', async () => {
        const actual = await (await sut.get(msgID)).toJSON();

        expect(actual)
            .to.be.an('object')
            .to.have.keys(['name', 'message', 'room_id', 'updatedAt', 'user_id', 'id', 'createdAt'])
            .not.to.be.undefined;
    });

    it('Should create new message', async () => {
        const message = await (await sut.create(newMsg)).toJSON();
        
        expect(message)
            .to.be.an('object')
            .to.have.keys(['name', 'message', 'room_id', 'updatedAt', 'user_id', 'id', 'createdAt'])
            .not.to.be.undefined;
    });
});
