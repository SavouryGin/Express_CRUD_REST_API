import express from 'express';
import GroupsService from './service.js';
import validateSchema from '../../helpers/validate-schema.js';
import validator from './validator.js';
import db from '../../data-access/index.js';

const router = express.Router();
const service = new GroupsService({ groupModel: db.Group, userModel: db.User, userGroupModel: db.UserGroup, sequelize: db.sequelize });

router
  .route('/')
  .get((_req, res) => {
    service
      .getAll()
      .then((groups) => res.status(200).send(groups))
      .catch((error) => res.status(404).send({ message: error?.message }));
  })
  .post(validateSchema(validator.add), (req, res) => {
    service
      .add(req.body)
      .then((groupId) => res.status(200).send({ message: `Group ${groupId} has been added successfully.` }))
      .catch((error) => res.status(404).send({ message: error?.message }));
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    service
      .getById(id)
      .then((group) => res.status(200).send(group))
      .catch((error) => res.status(404).send({ message: error?.message }));
  })
  .delete((req, res) => {
    const { id } = req.params;
    service
      .deleteById(id)
      .then((groupId) => res.status(200).send({ message: `Group ${groupId} has been deleted successfully.` }))
      .catch((error) => res.status(500).send({ message: error?.message }));
  })
  .patch(validateSchema(validator.update), (req, res) => {
    const { id } = req.params;
    const data = { name: req.body?.name, permissions: req.body?.permissions };
    service
      .updateById({ groupId: id, data })
      .then((groupId) => res.status(200).send({ message: `Group ${groupId} has been updated successfully.` }))
      .catch((error) => res.status(500).send({ message: error?.message }));
  })
  .post(validateSchema(validator.addUsers), (req, res) => {
    const { id } = req.params;
    service
      .addUsersToGroup({ groupId: id, userIds: req.body.userIds })
      .then((groupId) => res.status(200).send({ message: `Users have been added to group ${groupId} successfully.` }))
      .catch((error) => res.status(500).send({ message: error?.message }));
  });

export default router;
