import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    port: process.env.PORT,
    tokenKey: process.env.TOKEN_KEY,
    jwtExpiresIn: '2h',
    corsOptions: {
      origin: ['http://localhost:3000'],
    },
    db: {
      HOST: process.env.DB_HOST,
      USER: process.env.DB_USER,
      PASSWORD: process.env.DB_PASSWORD,
      DB: process.env.DB_NAME,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
  testing: {
    port: process.env.PORT,
    tokenKey: process.env.TOKEN_KEY,
    jwtExpiresIn: '2h',
    corsOptions: {
      origin: ['http://localhost:3000'],
    },
    db: {
      HOST: process.env.DB_HOST,
      USER: process.env.DB_USER,
      PASSWORD: process.env.DB_PASSWORD,
      DB: process.env.DB_TEST_NAME,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
};
