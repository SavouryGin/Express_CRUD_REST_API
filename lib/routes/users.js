import express from "express";
import controller from "../controllers/users.js";

const router = express.Router();

// All routes are starting from '/users'

router.get("/", controller.getAllUsers);

router.post("/", controller.addUser);

router.get("/:id", controller.getUserById);

router.delete("/:id", controller.deleteUserById);

router.patch("/:id", controller.updateUserById);

export default router;
