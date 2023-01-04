import express from "express";
import controller from "../controllers/users.js";
import validateSchema from "../validators/validate-schema.js";
import schema from "../validators/users-validation-schema.js";

const router = express.Router();

router.get("/", controller.getAllUsers);

router.post("/add", validateSchema(schema), controller.addUser);

router
  .route("/:id")
  .get(controller.getUserById)
  .delete(controller.deleteUserById)
  .patch(controller.updateUserById);

export default router;
