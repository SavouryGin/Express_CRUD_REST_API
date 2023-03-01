import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import logger from '../utils/logger.js';

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    logger.error('A token is required for authentication');
    return res.status(401).send({ message: 'A token is required for authentication' });
  }

  try {
    const decoded = jwt.verify(token, config.tokenKey);
    req.user = decoded;
  } catch (error) {
    logger.child({ context: { error } }).error('Invalid Token');
    return res.status(403).send({ message: 'Invalid Token' });
  }

  return next();
};

export default verifyToken;
