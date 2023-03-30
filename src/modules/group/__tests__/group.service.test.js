import GroupsService from '../service.js';
import MockGroupRepository from '../../../__mocks__/group-repo.js';
jest.mock('../../../__mocks__/group-repo.js');

describe('GroupsService tests', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MockGroupRepository.mockClear();
  });

  const testGroup = {
    name: 'testGroup',
    permissions: ['READ', 'WRITE', 'DELETE'],
  };

  it('should call the constructor of GroupRepository', async () => {
    const repo = new MockGroupRepository();
    const service = new GroupsService(repo);
    expect(service).toBeDefined();
    expect(MockGroupRepository).toHaveBeenCalledTimes(1);
  });

  it('should get the group by id', async () => {
    const repo = new MockGroupRepository();
    const service = new GroupsService(repo);
    await service.getById(testGroup.id);
    expect(repo.getById).toHaveBeenCalledTimes(1);
  });

  it('should add the group', async () => {
    const repo = new MockGroupRepository();
    const service = new GroupsService(repo);
    await service.add(testGroup);
    expect(repo.add).toHaveBeenCalledTimes(1);
  });

  it('should delete the group', async () => {
    const repo = new MockGroupRepository();
    const service = new GroupsService(repo);
    await service.deleteById(testGroup.id);
    expect(repo.deleteById).toHaveBeenCalledTimes(1);
  });

  it('should update the group', async () => {
    const repo = new MockGroupRepository();
    const service = new GroupsService(repo);
    await service.updateById(testGroup);
    expect(repo.updateById).toHaveBeenCalledTimes(1);
  });

  it('should prepare the data for user', async () => {
    const repo = new MockGroupRepository();
    const service = new GroupsService(repo);
    await service.addUsersToGroup({ groupId: testGroup.id, userIds: ['1', '2'] });
    expect(repo.addUsersToGroup).toHaveBeenCalledTimes(1);
  });
});
