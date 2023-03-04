// import request from 'supertest';
// import app from '../../../app.js';
// import db from '../../../data-access/index.js';

// describe('GET /api/products', () => {
//   /* Connecting to the database before each test. */
//   beforeEach(async () => {
//     await mongoose.connect(process.env.MONGODB_URI);
//   });

//   /* Closing database connection after each test. */
//   afterEach(async () => {
//     await mongoose.connection.close();
//   });

//   it('should return all products', async () => {
//     const res = await request(app).get('/api/products');
//     expect(res.statusCode).toBe(200);
//     expect(res.body.length).toBeGreaterThan(0);
//   });
// });
