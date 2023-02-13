export default (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
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

  return User;
};
