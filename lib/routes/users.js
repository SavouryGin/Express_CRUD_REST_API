import express from "express";

const router = express.Router();

// all routes are starting from '/users'
router.get("/", (req, res) => {
  res.send("Hello");
});

export default router;
