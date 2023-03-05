import express from 'express';
import cors from 'cors';
import usersRouter from '../modules/user/router.js';
import groupsRouter from '../modules/group/router.js';
import config from '../config/index.js';
import morganMiddleware from '../middlewares/morgan.js';

const app = express();

const ENV = process.env.NODE_ENV;

app.use(express.json());

app.use(cors(config[ENV].corsOptions));

app.use(morganMiddleware);

app.use('/users', usersRouter);

app.use('/groups', groupsRouter);

export default app;
