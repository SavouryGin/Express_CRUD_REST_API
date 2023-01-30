import express from 'express';
import controller from '../controllers/users.js';
import validateSchema from '../validators/validate-schema.js';
import addUserSchema from '../validators/add-user-validation-schema.js';
import updateUserSchema from '../validators/update-user-validation-schema.js';

export const usersRouter = express.Router();

usersRouter
  .get('/', async (req, res) => {
    const { status, users } = await controller.getAllUsers(req.query);
    res.status(status).send(users);
  })
  .post('/', validateSchema(addUserSchema), async (req, res) => {
    const { status, message } = await controller.addUser(req.body);
    res.status(status).send({ message });
  });

usersRouter
  .route('/:id')
  .get(controller.getUserById)
  .delete(controller.deleteUserById)
  .patch(validateSchema(updateUserSchema), controller.updateUserById);
