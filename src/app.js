import express from 'express';
import { usersRouter } from './routes/index.js';
import { SERVER_PORT } from './config/index.js';
import db from './models/index.js';

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

db.sequelize
  .sync()
  .then(() => {
    console.log('The database has been synced.');
  })
  .catch((err) => {
    console.log('Failed to sync the database: ' + err.message);
  });

app.get('/', (req, res) => {
  res.send('Welcome to the CRUD service!');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});
