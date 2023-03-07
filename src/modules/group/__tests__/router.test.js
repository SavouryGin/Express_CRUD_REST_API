import request from 'supertest';
import app from '../../../app/index.js';
import db from '../../../data-access/index.js';

describe('Groups router tests:', () => {
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

  it('GET /groups should return 401 error if the call is not authorized', async () => {
    const res = await request(app).get('/groups');
    expect(res.statusCode).toBe(401);
  });

  it('GET /groups should return 200 status if the request is authorized', async () => {
    const res = await request(app).get('/groups').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
  });

  // it('GET /groups/{id} should return a group', async () => {
  //   const newUser = { login: 'test3@gmail.com', password: '123TestPwd', age: 20 };
  //   const addRes = await request(app).post('/users').send(newUser);
  //   const userId = addRes.body.id;
  //   expect(userId).toBeDefined();
  //   const deleteRes = await request(app).get(`/users/${userId}`).set('x-access-token', token);
  //   expect(deleteRes.body.login).toBe(newUser.login);
  // });

  it('POST /groups should create a new user', async () => {
    const newGroup = { name: 'testGroup', permissions: ['READ', 'WRITE', 'DELETE'] };
    const res = await request(app).post('/groups').set('x-access-token', token).send(newGroup);
    expect(res.statusCode).toBe(201);
  });

  //   it('DELETE /users/{id} should delete a user', async () => {
  //     const newUser = { login: 'test3@gmail.com', password: '123TestPwd', age: 20 };
  //     const addRes = await request(app).post('/users').send(newUser);
  //     const userId = addRes.body.id;
  //     expect(userId).toBeDefined();
  //     const deleteRes = await request(app).delete(`/users/${userId}`).set('x-access-token', token);
  //     expect(deleteRes.statusCode).toBe(204);
  //   });

  //   it('PATCH /users/{id} should update a user', async () => {
  //     const newUser = { login: 'test3@gmail.com', password: '123TestPwd', age: 20 };
  //     const addRes = await request(app).post('/users').send(newUser);
  //     const userId = addRes.body.id;
  //     expect(userId).toBeDefined();
  //     const updateRes = await request(app).patch(`/users/${userId}`).set('x-access-token', token).send({ age: 30 });
  //     expect(updateRes.statusCode).toBe(204);
  //   });
});
