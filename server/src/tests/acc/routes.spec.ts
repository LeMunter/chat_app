// // Acceptance tests
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import UserService from '../../services/user-service';

chai.use(chaiHttp);

let token;
const api = process.env.NODE_ENV && process.env.NODE_ENV === 'ci' ? 'koa-backend-svc.development.svc.cluster.local:5000' : 'http://localhost:5000';

console.log(api);

describe('Auth Endpoints', async () => {
    const testUserCreds = {
        username: 'Bertil',
        password: 'Bertil1',
        role: 'admin',
        active: true
    };

    it('Create test user', async () => {
        const testUser = await new UserService().create(testUserCreds);
        console.log(testUser);
    });
    
    it('POST /api/auth/login should respond with a token', async () => {
        const res = await request(api).post('/api/auth/login').send({ username: testUserCreds.username, password: testUserCreds.password }).expect((res: any) => {
            res.body.token.length;
        }).expect(200);

        token = res.body.token;
    });

    it('POST /api/auth/login should return status code 400', (done: any) => {
        request(api).post('/api/auth/login').expect(400, done);
    });
});

describe('Application Endpoints', () => {
    it('GET /api/user should return status code 200', (done: any) => {
        request(api).get('/api/user').set('Authorization', 'Bearer ' + token).expect(200, done);
    });

    it('GET /api/user should return status code 401', (done: any) => {
        request(api).get('/api/user').expect(401, done);
    });

    it('GET /api/room should return status code 200', (done: any) => {
        request(api).get('/api/room').set('Authorization', 'Bearer ' + token).expect(200, done);
    });

    it('GET /api/room should return status code 401', (done: any) => {
        request(api).get('/api/room').expect(401, done);
    });
});
