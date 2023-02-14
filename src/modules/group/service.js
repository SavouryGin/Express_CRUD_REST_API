import crypto from 'crypto';

export default class GroupsService {
  constructor({ groupModel, userModel, userGroupModel, sequelize }) {
    this.groupModel = groupModel;
    this.userModel = userModel;
    this.userGroupModel = userGroupModel;
    this.sequelize = sequelize;
    this.includeOptions = [
      {
        model: userModel,
        as: 'users',
        required: false,
        attributes: ['id', 'login'],
        through: { attributes: [] },
      },
    ];
  }

  async getAll() {
    try {
      return await this.groupModel.findAll({
        attributes: ['id', 'name', 'permissions'],
        include: this.includeOptions,
      });
    } catch (error) {
      throw new Error(error?.message || 'getAll() error');
    }
  }

  async add(data) {
    try {
      const newId = crypto.randomUUID();
      const newGroup = await this.groupModel.create({ ...data, id: newId });
      return newGroup.dataValues.id;
    } catch (error) {
      throw new Error(error?.message || 'add() error');
    }
  }

  async getById(groupId) {
    try {
      const group = await this.groupModel.findOne({
        where: { id: groupId },
        attributes: ['id', 'name', 'permissions'],
        include: this.includeOptions,
      });

      if (!group) {
        throw new Error(`Group ${groupId} does not exist in the database`);
      }
      return group;
    } catch (error) {
      throw new Error(error?.message || 'getById() error');
    }
  }

  async deleteById(groupId) {
    try {
      const result = await this.groupModel.destroy({ where: { id: groupId } });
      if (result === 1) {
        return groupId;
      } else {
        throw new Error(`Group ${groupId} does not exist in the database`);
      }
    } catch (error) {
      throw new Error(error?.message || 'deleteById() error');
    }
  }

  async updateById({ groupId, data }) {
    try {
      const result = await this.groupModel.update(data, { where: { id: groupId } });
      if (!result[0]) {
        throw new Error(`Group ${groupId} does not exist in the database`);
      }
      return groupId;
    } catch (error) {
      throw new Error(error?.message || 'updateById() error');
    }
  }

  async addUsersToGroup({ groupId, userIds }) {
    const transaction = await this.sequelize.transaction();
    try {
      for (const userId of userIds) {
        await this.userGroupModel.create({ userId, groupId }, { transaction });
      }

      await transaction.commit();
      return groupId;
    } catch (error) {
      await transaction.rollback();
      throw new Error(error?.message || 'addUsersToGroup() error');
    }
  }
}
