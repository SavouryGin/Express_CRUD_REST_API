import crypto from 'crypto';

export default class GroupsService {
  constructor(repo) {
    this.repo = repo;
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async add(data) {
    const newId = crypto.randomUUID();
    const group = { ...data, id: newId };
    await this.repo.add(group);
  }

  async getById(groupId) {
    return await this.repo.getById(groupId);
  }

  async deleteById(groupId) {
    await this.repo.deleteById(groupId);
  }

  async updateById({ groupId, data }) {
    await this.repo.updateById({ groupId, data });
  }

  async addUsersToGroup({ groupId, userIds }) {
    await this.repo.addUsersToGroup({ groupId, userIds });
  }
}
