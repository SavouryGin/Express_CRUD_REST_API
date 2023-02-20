import { addColors, format as _format, transports as _transports, createLogger } from 'winston';

// Severity levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Set the current severity based on NODE_ENV:
// show all the log levels if the server was run in development mode;
// otherwise, show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define different colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell winston that you want to link the colors
addColors(colors);

// Chose the aspect of your log customizing the log format
const format = _format.combine(_format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), _format.json());

// Define which transports the logger must use to print out messages
const transports = [
  // error.log file to print all the error level messages
  new _transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  // all.log file to print all the error message
  new _transports.File({ filename: 'logs/all.log' }),
  // Console to print the messages
  new _transports.Console({
    format: _format.combine(
      _format.colorize({ all: true }),
      _format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
    ),
  }),
];

// Create the logger instance
const logger = createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
