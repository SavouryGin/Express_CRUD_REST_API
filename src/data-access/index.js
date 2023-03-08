import config from '../config/index.js';
import Sequelize from 'sequelize';
import UserModel from '../modules/user/model.js';
import GroupModel from '../modules/group/model.js';
import UserGroup from '../modules/user-group/model.js';

const ENV = process.env.NODE_ENV;
const dbConfig = config[ENV].db;

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: dbConfig.logging,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Create tables
db.User = UserModel(sequelize, Sequelize);
db.Group = GroupModel(sequelize, Sequelize);
db.UserGroup = UserGroup(sequelize, Sequelize);

// Make n:n association
db.User.belongsToMany(db.Group, {
  through: 'UserGroup',
  as: 'groups',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

db.Group.belongsToMany(db.User, {
  through: 'UserGroup',
  as: 'users',
  foreignKey: 'groupId',
  onDelete: 'CASCADE',
});

export default db;
