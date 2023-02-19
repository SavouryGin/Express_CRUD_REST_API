import express from 'express';
import UsersService from './service.js';
import validateSchema from '../../utils/validate-schema.js';
import validator from './validator.js';
import db from '../../data-access/index.js';

const router = express.Router();
const service = new UsersService({ userModel: db.User, groupModel: db.Group, operators: db.Sequelize.Op, sequelize: db.sequelize });

router
  .route('/')
  .get((req, res) => {
    service
      .getAll(req.query)
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(404).send({ message: error?.message }));
  })
  .post(validateSchema(validator.add), (req, res) => {
    service
      .add(req.body)
      .then((userId) => res.status(200).send({ message: `User ${userId} has been added successfully.` }))
      .catch((error) => res.status(404).send({ message: error?.message }));
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    service
      .getById(id)
      .then((user) => res.status(200).send(user))
      .catch((error) => res.status(404).send({ message: error?.message }));
  })
  .delete((req, res) => {
    const { id } = req.params;
    service
      .deleteById(id)
      .then((userId) => res.status(200).send({ message: `User ${userId} has been deleted successfully.` }))
      .catch((error) => res.status(500).send({ message: error?.message }));
  })
  .patch(validateSchema(validator.update), (req, res) => {
    const { id } = req.params;
    const data = { login: req.body?.login, password: req.body?.password, age: req.body?.age };
    service
      .updateById({ userId: id, data })
      .then((userId) => res.status(200).send({ message: `User ${userId} has been updated successfully.` }))
      .catch((error) => res.status(500).send({ message: error?.message }));
  });

export default router;
