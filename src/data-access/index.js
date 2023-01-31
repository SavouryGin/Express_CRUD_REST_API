import { DB_CONFIG } from '../config/index.js';
import Sequelize from 'sequelize';
import createUserModel from '../modules/user/model.js';

const sequelize = new Sequelize(DB_CONFIG.DB, DB_CONFIG.USER, DB_CONFIG.PASSWORD, {
  host: DB_CONFIG.HOST,
  dialect: DB_CONFIG.dialect,
  operatorsAliases: false,

  pool: {
    max: DB_CONFIG.pool.max,
    min: DB_CONFIG.pool.min,
    acquire: DB_CONFIG.pool.acquire,
    idle: DB_CONFIG.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = createUserModel(sequelize, Sequelize);

export default db;
