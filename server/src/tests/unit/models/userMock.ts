import SequelizeMock from 'sequelize-mock';

const sequelizeMock = new SequelizeMock();

const mockUser = sequelizeMock.define(
    'User',
    {
        username: 'Bertil',
        password: 'test123',
        active: true,
        role: 'admin'
    },
    {
        tableName: 'user',
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
);

export default mockUser;