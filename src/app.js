import express from 'express';
import { usersRouter } from './routes/index.js';

const PORT = 5000;
const app = express();

app.use(express.json());

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the CRUD service!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
