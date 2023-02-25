import crypto from 'crypto';

export default class GroupsService {
  constructor({ groupModel, userGroupModel, sequelize }) {
    this.groupModel = groupModel;
    this.userGroupModel = userGroupModel;
    this.sequelize = sequelize;
  }

  async getAll() {
    try {
      return await this.groupModel.findAll({
        attributes: ['id', 'name', 'permissions'],
      });
    } catch (error) {
      throw new Error(error?.message || 'getAll() error');
    }
  }

  async add(data) {
    const transaction = await this.sequelize.transaction();
    try {
      const newId = crypto.randomUUID();
      await this.groupModel.create({ ...data, id: newId }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
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
    const transaction = await this.sequelize.transaction();
    try {
      const result = await this.groupModel.destroy({ where: { id: groupId } }, { transaction });
      if (result === 0) {
        throw new Error(`Group ${groupId} does not exist in the database`);
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new Error(error?.message || 'deleteById() error');
    }
  }

  async updateById({ groupId, data }) {
    const transaction = await this.sequelize.transaction();
    try {
      const result = await this.groupModel.update(data, { where: { id: groupId } }, { transaction });
      if (!result[0]) {
        await transaction.rollback();
        throw new Error(`Group ${groupId} does not exist in the database`);
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
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
    } catch (error) {
      await transaction.rollback();
      throw new Error(error?.message || 'addUsersToGroup() error');
    }
  }
}
