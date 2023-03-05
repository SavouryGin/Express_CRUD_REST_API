import request from 'supertest';
import app from '../../../app/index.js';
import db from '../../../data-access/index.js';

describe('GET /api/products', () => {
  const userPayload = { login: 'test@gmail.com', password: '123TestPwd', age: 20 };
  let token;
  // Connecting to the database before running tests
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    await request(app).post('/users').send(userPayload);
    const res = await request(app).post('/users/login').send({ login: userPayload.login, password: userPayload.password });
    token = res.body.token;
  });

  // Closing database connection after all tests
  afterAll(async () => {
    await db.sequelize.close();
  });

  it('GET /users should return a 401 error if the call is not authorized', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(401);
  });

  it('GET /users should return a 403 error if access token is invalid', async () => {
    const res = await request(app).get('/users').set('x-access-token', 'abc123');
    expect(res.statusCode).toBe(403);
  });

  it('GET /users should return 200 status is authorized', async () => {
    const res = await request(app).get('/users').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
  });
});
