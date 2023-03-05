import config from './config/index.js';
import logger from './utils/logger.js';
import app from './app/index.js';

const ENV = process.env.NODE_ENV;
const PORT = config[ENV].port;

const server = app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (error, source) => {
  logger.info('An uncaught error has occurred. The server will be stopped.');
  logger.child({ context: { error, source } }).error(error?.message);
  server.close(() => {
    logger.info('Server has been stopped.');
  });
});
