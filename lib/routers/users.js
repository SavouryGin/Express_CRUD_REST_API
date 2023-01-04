import express from "express";
import controller from "../controllers/users.js";

const router = express.Router();

router.get("/", controller.getAllUsers);

router.post("/add", controller.addUser);

router
  .route("/:id")
  .get(controller.getUserById)
  .delete(controller.deleteUserById)
  .patch(controller.updateUserById);

export default router;
