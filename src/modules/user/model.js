const createUsersModel = (sequelize, Sequelize) => {
  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    login: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: { notEmpty: true, isEmail: true },
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: { notEmpty: true },
    },
    age: {
      type: Sequelize.INTEGER,
    },
    isDeleted: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
  });

  return Users;
};

export default createUsersModel;
