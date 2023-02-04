const createGroupModel = (sequelize, Sequelize) => {
  const Group = sequelize.define('group', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    permissions: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
  });

  return Group;
};

export default createGroupModel;
