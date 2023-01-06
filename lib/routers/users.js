import express from "express";
import controller from "../controllers/users.js";
import validateSchema from "../validators/validate-schema.js";
import usersSchema from "../validators/users-validation-schema.js";
import autoSuggestSchema from "../validators/auto-suggest-validation-schema.js";

const router = express.Router();

router.get("/", controller.getAllUsers);

router.get(
  "/suggest",
  validateSchema(autoSuggestSchema),
  controller.getAutoSuggest
);

router.post("/add", validateSchema(usersSchema), controller.addUser);

router
  .route("/:id")
  .get(controller.getUserById)
  .delete(controller.deleteUserById)
  .patch(controller.updateUserById);

export default router;
