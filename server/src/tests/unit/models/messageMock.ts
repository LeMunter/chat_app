import SequelizeMock from 'sequelize-mock';

const sequelizeMock = new SequelizeMock();

const mockMessage = sequelizeMock.define(
    'Message',
    {
        name: 'a message',
        message: 'test123',
        user_id: 1,
        room_id: 1
    },
    {
        tableName: 'message',
        createdAt: false,
        updatedAt: false
    }
);

export default mockMessage;