// // Unit test the chatroom service.
import { expect } from 'chai';
import mockChatroom from './models/chatroomMock';
import ChatRoomService from '../../services/chatroom-service';
import Chatroom from '../../models/chatroom';

const sut = new ChatRoomService(mockChatroom);
const roomID = 1;
const newRoom = {
    name: 'room2',
    is_public: true,
    tags: ['computers', 'somethingelse'],
    user_ids: [3, 1, 4],
    message_ids: [1]
};

describe('Chatroom service', () => {
    it('Should return chatroom', async () => {
        const actual = (await sut.get(roomID)).toJSON();

        expect(actual)
            .to.be.an('object')
            .to.have.keys(['name', 'is_public', 'tags', 'user_ids', 'id', 'message_ids'])
            .not.to.be.undefined;
    });

    it('Should return array of rooms', async () => {
        const actual = (await sut.getAll()).map((a: Chatroom) => a.toJSON());
        
        expect(actual).to.be.lengthOf.greaterThan(0).to.be.an('array');
    });

    it('Should return empty room array', async () => {
        mockChatroom.$queryInterface.$useHandler((query: string) => {
            if (query === 'findAll') {
                return [];
            }
        });

        const actual = await sut.getAll();
        expect(actual).to.be.an('array').to.be.lengthOf(0);
    });

    it('Should create new chatroom', async () => {
        const chatroom = await (await sut.create(newRoom)).toJSON();
        
        expect(chatroom)
            .to.be.an('object')
            .to.have.keys(['name', 'is_public', 'tags', 'user_ids', 'id', 'message_ids'])
            .not.to.be.undefined;
    });
});
