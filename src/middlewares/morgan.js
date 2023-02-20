import morgan from 'morgan';
import logger from '../utils/logger.js';

const stream = {
  // Use the http severity
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const morganMiddleware = morgan(
  // Define message format string
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream, skip },
);

export default morganMiddleware;
