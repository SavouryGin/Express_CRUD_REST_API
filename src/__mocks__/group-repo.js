import AbstractRepository from '../data-access/abstract-repository.js';

export default class MockGroupRepository extends AbstractRepository {
  constructor() {
    super();
    console.log('MockGroupRepository: constructor was called');
  }

  async exists(_groupId) {
    console.log('MockGroupRepository: exists was called');
  }

  async getAll(_data) {
    console.log('MockGroupRepository: getAll was called');
  }

  async getById(_groupId) {
    console.log('MockGroupRepository: getById was called');
  }

  async getByLogin(_login) {
    console.log('MockGroupRepository: getByLogin was called');
    return {
      login: 'test@gmail.com',
      age: 27,
      password: 'testPwd123',
    };
  }

  async add(_group) {
    console.log('MockGroupRepository: add was called');
  }

  async deleteById(_groupId) {
    console.log('MockGroupRepository: deleteById was called');
  }

  async updateById(_data) {
    console.log('MockGroupRepository: updateById was called');
  }

  async addUsersToGroup(_data) {
    console.log('MockGroupRepository: addUsersToGroup was called');
  }
}
