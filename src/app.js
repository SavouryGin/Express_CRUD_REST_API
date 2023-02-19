import express from 'express';
import usersRouter from './modules/user/router.js';
import groupsRouter from './modules/group/router.js';
import config from './config/index.js';
import db from './data-access/index.js';
import morganMiddleware from './middlewares/morgan.js';
import logger from './utils/logger.js';

const app = express();

app.use(express.json());

app.use(morganMiddleware);

app.use('/users', usersRouter);

app.use('/groups', groupsRouter);

db.sequelize
  .sync()
  .then(() => logger.info('The database has been synced.'))
  .catch((error) => logger.error(`Failed to sync the database: ${error.message}`));

app.listen(config.port, () => {
  logger.info(`Server is running on http://localhost:${config.port}`);
});
