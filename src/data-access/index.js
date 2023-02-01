import config from '../config/index.js';
import Sequelize from 'sequelize';
import createUserModel from '../modules/user/model.js';

const sequelize = new Sequelize(config.db.DB, config.db.USER, config.db.PASSWORD, {
  host: config.db.HOST,
  dialect: config.db.dialect,
  operatorsAliases: false,

  pool: {
    max: config.db.pool.max,
    min: config.db.pool.min,
    acquire: config.db.pool.acquire,
    idle: config.db.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Create tables in the database
db.users = createUserModel(sequelize, Sequelize);

export default db;
