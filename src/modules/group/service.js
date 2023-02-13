import crypto from 'crypto';

export default class GroupsService {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      return await this.model.findAll({
        attributes: ['id', 'name', 'permissions'],
      });
    } catch (error) {
      throw new Error(error?.message || 'getAll() error');
    }
  }

  async add(data) {
    try {
      const newId = crypto.randomUUID();
      const newGroup = await this.model.create({ ...data, id: newId });
      return newGroup.dataValues.id;
    } catch (error) {
      throw new Error(error?.message || 'add() error');
    }
  }

  async getById(groupId) {
    try {
      const group = await this.model.findOne({
        where: { id: groupId },
        attributes: ['id', 'name', 'permissions'],
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
      const result = await this.model.destroy({ where: { id: groupId } });
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
      const result = await this.model.update(data, { where: { id: groupId } });
      if (!result[0]) {
        throw new Error(`Group ${groupId} does not exist in the database`);
      }
      return groupId;
    } catch (error) {
      throw new Error(error?.message || 'updateById() error');
    }
  }
}
