const createUsersToGroups = (sequelize, Sequelize) => {
  const UsersToGroups = sequelize.define('UsersToGroups', {
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    groupId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'id',
      },
    },
  });
  return UsersToGroups;
};

export default createUsersToGroups;
