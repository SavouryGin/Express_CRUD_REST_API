import request from 'supertest';
import app from '../../../app/index.js';
import db from '../../../data-access/index.js';

describe('GET /api/products', () => {
  /* Connecting to the database before each test. */
  beforeEach(async () => {
    db.sequelize
      .sync({ force: true })
      .then(() => {
        console.log('Synced db.');
      })
      .catch((err) => {
        console.log('Failed to sync db: ' + err.message);
      });
  });

  //   /* Closing database connection after each test. */
  //   afterEach(async () => {
  //     await mongoose.connection.close();
  //   });

  it('should return all users', async () => {
    const res = await request(app).get('http://localhost:9000/users');
    console.log(res);
    expect(res.statusCode).toBe(200);
    // expect(res.body.length).toBeGreaterThan(0);
  });
});
