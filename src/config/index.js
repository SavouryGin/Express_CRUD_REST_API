// Environment variables and configuration related stuff
export const SERVER_PORT = 5000;

export const DB_CONFIG = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'Gin20062330',
  DB: 'node_js_gmp_2023_db',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
