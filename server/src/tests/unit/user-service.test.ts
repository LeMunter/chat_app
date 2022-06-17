// // Unit test the user service.
import { expect } from 'chai';
import mockUser from './models/userMock';
import UserService from '../../services/user-service';
import User from '../../models/user';

const sut = new UserService(mockUser);
const userID = 1;
const newUser = {
    username: 'Rune',
    password: 'superpassword',
    active: true,
    role: 'user'
};

describe('User service', () => {
    it('Should return a user', async () => {
        const actual = (await sut.get(userID)).toJSON();

        expect(actual)
            .to.be.an('object')
            .to.have.keys(['username', 'password', 'active', 'role', 'id'])
            .not.to.be.undefined;
    });

    it('Should return array of users', async () => {
        const actual = (await sut.getAll()).map((a: User) => a.toJSON());

        expect(actual)
            .to.be.lengthOf.greaterThan(0)
            .to.have.an('array');
    });

    it('Should return empty user array', async () => {
        mockUser.$queryInterface.$useHandler((query: string) => {
            if (query === 'findAll') {
                return [];
            }
        });

        const actual = await sut.getAll();
        expect(actual)
            .to.have.an('array')
            .to.be.lengthOf(0);
    });

    it('Should create new user with hashed password', async () => {
        const user = await (await sut.create(newUser)).toJSON();
        
        expect(user)
            .to.be.an('object')
            .to.have.keys(['username', 'password', 'active', 'role', 'id'])
            .not.to.be.undefined;

        expect(user.password).to.not.eql(newUser.password);
    });
});
