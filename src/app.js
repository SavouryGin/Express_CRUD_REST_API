import express from 'express';
import cors from 'cors';
import usersRouter from './modules/user/router.js';
import groupsRouter from './modules/group/router.js';
import config from './config/index.js';
import morganMiddleware from './middlewares/morgan.js';
import logger from './utils/logger.js';

const app = express();

app.use(express.json());

app.use(cors(config.corsOptions));

app.use(morganMiddleware);

app.use('/users', usersRouter);

app.use('/groups', groupsRouter);

const server = app.listen(config.port, () => {
  logger.info(`Server is running on http://localhost:${config.port}`);
});

process.on('uncaughtException', (error, source) => {
  logger.info('An uncaught error has occurred. The server will be stopped.');
  logger.child({ context: { error, source } }).error(error?.message);
  server.close(() => {
    logger.info('Server has been stopped.');
  });
});
