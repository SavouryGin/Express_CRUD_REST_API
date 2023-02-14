export default (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Group',
        key: 'id',
      },
    },
  });

  return UserGroup;
};
