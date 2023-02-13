import config from '../config/index.js';
import Sequelize from 'sequelize';
import createUsersModel from '../modules/user/model.js';
import createGroupsModel from '../modules/group/model.js';
import createUsersToGroups from '../modules/users-to-groups/model.js';

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

db.Users = createUsersModel(sequelize, Sequelize);
db.Groups = createGroupsModel(sequelize, Sequelize);
db.UsersToGroups = createUsersToGroups(sequelize, Sequelize);

export default db;
