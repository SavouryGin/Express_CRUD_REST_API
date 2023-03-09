import request from 'supertest';
import app from '../../../app/index.js';
import db from '../../../data-access/index.js';

describe('Group router tests:', () => {
  const userPayload = { login: 'test@gmail.com', password: '123TestPwd', age: 20 };
  const groupPayload = { name: 'testGroup', permissions: ['READ', 'WRITE', 'DELETE'] };
  let token;

  // Connecting to the database before running tests
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    await request(app).post('/users').send(userPayload);
    const res = await request(app).post('/users/login').send({ login: userPayload.login, password: userPayload.password });
    token = res.body.token;
  });

  it('GET /groups should return 401 error if the call is not authorized', async () => {
    const res = await request(app).get('/groups');
    expect(res.statusCode).toBe(401);
  });

  it('GET /groups should return 200 status if the request is authorized', async () => {
    const res = await request(app).get('/groups').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
  });

  it('GET /groups/{id} should return a group', async () => {
    const addRes = await request(app).post('/groups').set('x-access-token', token).send(groupPayload);
    const groupId = addRes.body.id;
    expect(groupId).toBeDefined();
    const deleteRes = await request(app).get(`/groups/${groupId}`).set('x-access-token', token);
    expect(deleteRes.body.login).toBe(groupId.name);
  });

  it('POST /groups should create a new group', async () => {
    const res = await request(app).post('/groups').set('x-access-token', token).send(groupPayload);
    expect(res.statusCode).toBe(201);
  });

  it('DELETE /groups/{id} should delete a group', async () => {
    const addRes = await request(app).post('/groups').set('x-access-token', token).send(groupPayload);
    const groupId = addRes.body.id;
    expect(groupId).toBeDefined();
    const deleteRes = await request(app).delete(`/groups/${groupId}`).set('x-access-token', token);
    expect(deleteRes.statusCode).toBe(204);
  });

  it('PATCH /groups/{id} should update a group', async () => {
    const addRes = await request(app).post('/groups').set('x-access-token', token).send(groupPayload);
    const groupId = addRes.body.id;
    expect(groupId).toBeDefined();
    const updateRes = await request(app).patch(`/groups/${groupId}`).set('x-access-token', token).send({ name: 'newName' });
    expect(updateRes.statusCode).toBe(204);
  });

  // Closing database connection after all tests
  afterAll(async () => {
    await db.sequelize.close();
  });
});
