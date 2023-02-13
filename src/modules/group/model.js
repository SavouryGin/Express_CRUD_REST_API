const createGroupsModel = (sequelize, Sequelize) => {
  const Groups = sequelize.define('Groups', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: { notEmpty: true },
    },
    permissions: {
      allowNull: false,
      type: Sequelize.ARRAY(Sequelize.STRING),
      validate: { notEmpty: true },
    },
  });

  return Groups;
};

export default createGroupsModel;
