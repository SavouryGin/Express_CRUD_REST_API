import UsersService from '../service.js';
import MockUserRepository from '../../../__mocks__/user-repo.js';
jest.mock('../../../__mocks__/user-repo.js');

describe('UsersService tests', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MockUserRepository.mockClear();
  });

  const testUser = {
    login: 'test@gmail.com',
    age: 27,
    password: 'testPwd123',
  };

  it('should call the constructor of UserRepository', async () => {
    const repo = new MockUserRepository();
    const service = new UsersService(repo);
    expect(service).toBeDefined();
    expect(MockUserRepository).toHaveBeenCalledTimes(1);
  });

  it('should get the user by id', async () => {
    const repo = new MockUserRepository();
    const service = new UsersService(repo);
    await service.getById(testUser.id);
    expect(repo.getById).toHaveBeenCalledTimes(1);
  });

  it('should add the user', async () => {
    const repo = new MockUserRepository();
    const service = new UsersService(repo);
    await service.add(testUser);
    expect(repo.add).toHaveBeenCalledTimes(1);
  });

  it('should delete the user', async () => {
    const repo = new MockUserRepository();
    const service = new UsersService(repo);
    await service.deleteById(testUser.id);
    expect(repo.deleteById).toHaveBeenCalledTimes(1);
  });

  it('should update the user', async () => {
    const repo = new MockUserRepository();
    const service = new UsersService(repo);
    await service.updateById(testUser);
    expect(repo.updateById).toHaveBeenCalledTimes(1);
  });

  it('should prepare the data for user', async () => {
    const repo = new MockUserRepository();
    const service = new UsersService(repo);
    const newData = await service.prepareData(testUser);
    expect(newData.id).toBeDefined();
    expect(newData.password).not.toBe(testUser.password);
    expect(newData.isDeleted).toBeFalsy();
  });
});
