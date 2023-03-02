import express from 'express';
import jwt from 'jsonwebtoken';
import UsersService from './service.js';
import UserRepository from './repository.js';
import validateSchema from '../../utils/validate-schema.js';
import validator from './validator.js';
import db from '../../data-access/index.js';
import logger from '../../utils/logger.js';
import config from '../../config/index.js';
import auth from '../../middlewares/auth.js';

const router = express.Router();
const repo = new UserRepository(db);
const service = new UsersService(repo);

router
  .route('/')
  .get(auth, (req, res) => {
    service
      .getAll(req.query)
      .then((users) => res.status(200).send(users))
      .catch((error) => {
        logger.error(`Method 'getAll' failed: ${error?.message}`);
        res.status(404).send({ message: error?.message });
      });
  })
  .post(auth, validateSchema(validator.add), (req, res) => {
    service
      .add(req.body)
      .then(() => res.sendStatus(201))
      .catch((error) => {
        logger.error(`Method 'add' failed: ${error?.message}`);
        res.status(404).send({ message: error?.message });
      });
  });

router
  .route('/:id')
  .get(auth, (req, res) => {
    const { id } = req.params;
    service
      .getById(id)
      .then((user) => res.status(200).send(user))
      .catch((error) => {
        logger.child({ context: { params: req.params } }).error(`Method 'getById' failed: ${error?.message}`);
        res.status(404).send({ message: error?.message });
      });
  })
  .delete(auth, (req, res) => {
    const { id } = req.params;
    service
      .deleteById(id)
      .then(() => res.sendStatus(204))
      .catch((error) => {
        logger.child({ context: { params: req.params } }).error(`Method 'deleteById' failed: ${error?.message}`);
        res.status(404).send({ message: error?.message });
      });
  })
  .patch(auth, validateSchema(validator.update), (req, res) => {
    const { id } = req.params;
    const data = { login: req.body?.login, password: req.body?.password, age: req.body?.age };
    service
      .updateById({ userId: id, data })
      .then(() => res.sendStatus(204))
      .catch((error) => {
        logger.child({ context: { params: req.params, body: req.body } }).error(`Method 'updateById' failed: ${error?.message}`);
        res.status(500).send({ message: error?.message });
      });
  });

router.post('/login', validateSchema(validator.login), (req, res) => {
  const { login, password } = req.body;
  service
    .loginUser(login, password)
    .then((payload) => {
      logger.info(`Successful login for user "${login}"`);
      const token = jwt.sign(payload, config.tokenKey, { expiresIn: config.jwtExpiresIn });
      res.status(201).send({ token });
    })
    .catch((error) => {
      logger.error(`Failed login attempt for user "${login}"`);
      res.status(400).send({ message: error?.message });
    });
});

export default router;
