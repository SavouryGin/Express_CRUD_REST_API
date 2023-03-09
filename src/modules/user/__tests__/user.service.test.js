import UsersService from '../service.js';
// import UserRepository from '../repository.js';
import MockUserRepository from '../../../__mocks__/user-repo.js';
import testUser from '../../../__mocks__/test-user.js';
jest.mock('../../../__mocks__/user-repo.js');

describe('UsersService tests', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MockUserRepository.mockClear();
  });

  it('should call the constructor of UserRepository', async () => {
    const repo = new MockUserRepository();
    const service = new UsersService(repo);
    expect(service).toBeDefined();
    expect(MockUserRepository).toHaveBeenCalledTimes(1);
  });

  it('should return the user by id', async () => {
    const repo = new MockUserRepository();
    const service = new UsersService(repo);
    const user = await service.getById('test-id');
    expect(repo.getById).toHaveBeenCalledTimes(1);
    expect(user).toEqual(testUser);
  });
  // context('associations', () => {
  //   const Company = 'some dummy company'

  //   before(() => {
  //     User.associate({ Company })
  //   })

  //   it('defined a belongsTo association with Company', () => {
  //     expect(User.belongsTo).to.have.been.calledWith(Company)
  //   })
  // })

  // context('indexes', () => {
  //   ;['email', 'token'].forEach(checkUniqueIndex(user))
  // })
});
