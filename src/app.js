import express from 'express';
import usersRouter from './modules/user/router.js';
import config from './config/index.js';
import db from './data-access/index.js';

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

db.sequelize
  .sync()
  .then(() => console.log('The database has been synced.'))
  .catch((error) => console.error('Failed to sync the database: ' + error.message));

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
