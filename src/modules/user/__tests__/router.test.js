import request from 'supertest';
import app from '../../../app/index.js';
import db from '../../../data-access/index.js';

describe('GET /api/products', () => {
  /* Connecting to the database before each test. */
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  /* Closing database connection after each test. */
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
});
