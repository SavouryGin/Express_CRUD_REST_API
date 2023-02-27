export default class AbstractRepository {
  constructor() {
    if (this.constructor === AbstractRepository) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  async exists() {
    throw new Error("Method 'exists()' must be implemented.");
  }

  async getAll() {
    throw new Error("Method 'getAll()' must be implemented.");
  }

  async add() {
    throw new Error("Method 'add()' must be implemented.");
  }

  async getById() {
    throw new Error("Method 'getById()' must be implemented.");
  }

  async deleteById() {
    throw new Error("Method 'deleteById()' must be implemented.");
  }

  async updateById() {
    throw new Error("Method 'updateById()' must be implemented.");
  }
}
