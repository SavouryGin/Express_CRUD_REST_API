import AbstractRepository from '../data-access/abstract-repository.js';

export default class MockUserRepository extends AbstractRepository {
  constructor() {
    super();
    console.log('MockUserRepository: constructor was called');
  }

  async exists(_userId) {
    console.log('MockUserRepository: exists was called');
  }

  async getAll(_data) {
    console.log('MockUserRepository: getAll was called');
  }

  async getById(_userId) {
    console.log('MockUserRepository: getById was called');
  }

  async getByLogin(_login) {
    console.log('MockUserRepository: getByLogin was called');
    return {
      login: 'test@gmail.com',
      age: 27,
      password: 'testPwd123',
    };
  }

  async add(_user) {
    console.log('MockUserRepository: add was called');
  }

  async deleteById(_userId) {
    console.log('MockUserRepository: deleteById was called');
  }

  async updateById(_data) {
    console.log('MockUserRepository: updateById was called');
  }
}
