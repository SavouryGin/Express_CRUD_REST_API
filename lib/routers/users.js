import express from 'express';
import controller from '../controllers/users.js';
import validateSchema from '../validators/validate-schema.js';
import addUserSchema from '../validators/add-user-validation-schema.js';
import updateUserSchema from '../validators/update-user-validation-schema.js';

const router = express.Router();

router.get('/', controller.getAllUsers);

router.post('/add', validateSchema(addUserSchema), controller.addUser);

router
  .route('/:id')
  .get(controller.getUserById)
  .delete(controller.deleteUserById)
  .patch(validateSchema(updateUserSchema), controller.updateUserById);

export default router;
