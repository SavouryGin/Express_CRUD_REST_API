import crypto from 'crypto';

export default class GroupsService {
  constructor(model) {
    this.model = model;
  }

  async getAllGroups() {
    try {
      return await this.model.findAll({
        attributes: ['id', 'name', 'permissions'],
      });
    } catch (error) {
      throw new Error(error?.message || 'getAllGroups() error');
    }
  }

  async addGroup(data) {
    try {
      const preparedData = await this.prepareGroupData(data);
      const newGroup = await this.model.create(preparedData);
      return newGroup.dataValues.id;
    } catch (error) {
      throw new Error(error?.message || 'addGroup() error');
    }
  }

  async getGroupById(groupId) {
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
      throw new Error(error?.message || 'getGroupById() error');
    }
  }

  async deleteGroupById(groupId) {
    try {
      const result = await this.model.destroy({ where: { id: groupId } });
      if (!result[0]) {
        throw new Error(`Group ${groupId} does not exist in the database`);
      }
      return groupId;
    } catch (error) {
      throw new Error(error?.message || 'deleteGroupById() error');
    }
  }

  async updateGroupById({ groupId, data }) {
    try {
      const result = await this.model.update(data, { where: { id: groupId } });
      if (!result[0]) {
        throw new Error(`Group ${groupId} does not exist in the database`);
      }
      return groupId;
    } catch (error) {
      throw new Error(error?.message || 'updateGroupById() error');
    }
  }

  async prepareGroupData(data) {
    const newId = crypto.randomUUID();

    return { ...data, id: newId };
  }
}
