import express from 'express';
import controller from '../controllers/user.controller.js';
import validateSchema from '../validators/validate-schema.js';
import addUserSchema from '../validators/add-user-validation-schema.js';
import updateUserSchema from '../validators/update-user-validation-schema.js';

export const usersRouter = express.Router();

usersRouter
  .get('/', (req, res) => {
    controller
      .getAllUsers(req.query)
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(404).send({ message: error?.message }));
  })
  .post('/', validateSchema(addUserSchema), (req, res) => {
    controller
      .addUser(req.body)
      .then((userId) => res.status(200).send({ message: `User ${userId} has been added successfully.` }))
      .catch((error) => res.status(404).send({ message: error?.message }));
  });

usersRouter
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    controller
      .getUserById(id)
      .then((user) => res.status(200).send(user))
      .catch((error) => res.status(404).send({ message: error?.message }));
  })
  .delete((req, res) => {
    const { id } = req.params;
    controller
      .deleteUserById(id)
      .then((userId) => res.status(200).send({ message: `User ${userId} has been deleted successfully.` }))
      .catch((error) => res.status(500).send({ message: error?.message }));
  })
  .patch(validateSchema(updateUserSchema), (req, res) => {
    const { id } = req.params;
    const data = { login: req.body?.login, password: req.body?.password, age: req.body?.age };
    controller
      .updateUserById({ userId: id, data })
      .then((userId) => res.status(200).send({ message: `User ${userId} has been updated successfully.` }))
      .catch((error) => res.status(500).send({ message: error?.message }));
  });
