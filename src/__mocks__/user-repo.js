import testUser from './test-user.js';

export default class MockUserRepository {
  constructor() {
    console.log('MockUserRepository: constructor was called ');
  }

  async exists(userId) {
    console.log('MockUserRepository: exists was called with');
  }

  async getAll({ isAutoSuggest, loginSubstring, limit }) {
    console.log('MockUserRepository: getAll was called with');
  }

  async getById(userId) {
    console.log('MockUserRepository: getById was called with');
    return testUser;
  }

  async getByLogin(login) {
    console.log('MockUserRepository: getByLogin was called with');
    return testUser;
  }

  async add(user) {
    console.log('MockUserRepository: add was called with');
    return testUser.id;
  }

  async deleteById(userId) {
    console.log('deleteById: add was called with');
  }

  async updateById({ userId, data }) {
    console.log('updateById: add was called with');
  }
}
