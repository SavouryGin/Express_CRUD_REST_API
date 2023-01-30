export default (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.STRING,
    },
    login: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.NUMBER,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
    },
  });

  return User;
};
