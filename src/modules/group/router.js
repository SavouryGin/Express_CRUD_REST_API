import express from 'express';
import GroupsService from './service.js';
import GroupRepository from './repository.js';
import validateSchema from '../../utils/validate-schema.js';
import validator from './validator.js';
import db from '../../data-access/index.js';
import logger from '../../utils/logger.js';
import auth from '../../middlewares/auth.js';

const router = express.Router();
const repo = new GroupRepository(db);
const service = new GroupsService(repo);

router
  .route('/')
  .get(auth, (_req, res) => {
    service
      .getAll()
      .then((groups) => res.status(200).send(groups))
      .catch((error) => {
        logger.error(`getAll failed: ${error?.message}`);
        res.status(404).send({ message: error?.message });
      });
  })
  .post(auth, validateSchema(validator.add), (req, res) => {
    service
      .add(req.body)
      .then((id) => res.status(201).send({ id }))
      .catch((error) => {
        logger.error(`add failed: ${error?.message}`);
        res.status(404).send({ message: error?.message });
      });
  });

router
  .route('/:id')
  .get(auth, (req, res) => {
    const { id } = req.params;
    service
      .getById(id)
      .then((group) => res.status(200).send(group))
      .catch((error) => {
        logger.child({ context: { params: req.params } }).error(`getById failed: ${error?.message}`);
        res.status(404).send({ message: error?.message });
      });
  })
  .delete(auth, (req, res) => {
    const { id } = req.params;
    service
      .deleteById(id)
      .then(() => res.sendStatus(204))
      .catch((error) => {
        logger.child({ context: { params: req.params } }).error(`deleteById failed: ${error?.message}`);
        res.status(404).send({ message: error?.message });
      });
  })
  .patch(auth, validateSchema(validator.update), (req, res) => {
    const { id } = req.params;
    const data = { name: req.body?.name, permissions: req.body?.permissions };
    service
      .updateById({ groupId: id, data })
      .then(() => res.sendStatus(204))
      .catch((error) => {
        logger.error(`updateById failed: ${error?.message}`);
        res.status(500).send({ message: error?.message });
      });
  })
  .post(auth, validateSchema(validator.addUsers), (req, res) => {
    const { id } = req.params;
    service
      .addUsersToGroup({ groupId: id, userIds: req.body.userIds })
      .then(() => res.sendStatus(204))
      .catch((error) => {
        logger.child({ context: { params: req.params, body: req.body } }).error(`addUsersToGroup failed: ${error?.message}`);
        res.status(500).send({ message: error?.message });
      });
  });

export default router;
