import AbstractRepository from '../../data-access/abstract-repository.js';

export default class GroupRepository extends AbstractRepository {
  constructor(db) {
    super();
    this.groupModel = db.Group;
    this.userGroupModel = db.UserGroup;
    this.sequelize = db.sequelize;
  }

  async exists(groupId) {
    const result = await this.groupModel.findOne({
      where: { id: groupId },
    });
    return !!result === true;
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

  async add(group) {
    let t;
    try {
      t = await this.sequelize.transaction();
      const newGroup = await this.groupModel.create(group, { transaction: t });
      await t.commit();
      return newGroup.id;
    } catch (error) {
      if (t) await t.rollback();
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
    let t;
    try {
      t = await this.sequelize.transaction();
      const exists = await this.exists(groupId);

      if (!exists) {
        throw new Error(`Group ${groupId} does not exist in the database`);
      }

      await this.groupModel.destroy({ where: { id: groupId } }, { transaction: t });
      await t.commit();
    } catch (error) {
      if (t) await t.rollback();
      throw new Error(error?.message || 'deleteById() error');
    }
  }

  async updateById({ groupId, data }) {
    let t;
    try {
      t = await this.sequelize.transaction();
      const exists = await this.exists(groupId);

      if (!exists) {
        throw new Error(`Group ${groupId} does not exist in the database`);
      }

      await this.groupModel.update(data, { where: { id: groupId } }, { transaction: t });
      await t.commit();
    } catch (error) {
      if (t) await t.rollback();
      throw new Error(error?.message || 'updateById() error');
    }
  }

  async addUsersToGroup({ groupId, userIds }) {
    let t;
    try {
      t = await this.sequelize.transaction();
      for (const userId of userIds) {
        await this.userGroupModel.create({ userId, groupId }, { transaction: t });
      }

      await t.commit();
    } catch (error) {
      if (t) await t.rollback();
      throw new Error(error?.message || 'addUsersToGroup() error');
    }
  }
}
