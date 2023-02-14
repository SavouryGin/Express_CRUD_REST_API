import config from '../config/index.js';
import Sequelize from 'sequelize';
import UserModel from '../modules/user/model.js';
import GroupModel from '../modules/group/model.js';
import UserGroup from '../modules/user-group/model.js';

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

// Create tables
db.User = UserModel(sequelize, Sequelize);
db.Group = GroupModel(sequelize, Sequelize);
db.UserGroup = UserGroup(sequelize, Sequelize);

// Make n:n association
db.User.belongsToMany(db.Group, {
  through: 'UserGroup',
  as: 'groups',
  foreignKey: 'userId',
});

db.Group.belongsToMany(db.User, {
  through: 'UserGroup',
  as: 'users',
  foreignKey: 'groupId',
});

export default db;
