import express from "express";
import bodyParser from "body-parser";
import userRoutes from "../routes/users.js";

const PORT = 5000;
const app = express();

app.use(bodyParser.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Home!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
