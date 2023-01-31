import crypto from 'crypto';

export default class UsersService {
  constructor(model, operators) {
    this.model = model;
    this.Op = operators;
  }

  async getAllUsers(queryParams) {
    try {
      const { loginSubstring, limit } = queryParams;
      const isAutoSuggest = loginSubstring && loginSubstring.length && limit && Number.isInteger(+limit);
      const condition = isAutoSuggest
        ? {
            isDeleted: false,
            login: { [this.Op.substring]: loginSubstring },
          }
        : { isDeleted: false };

      return await this.model.findAll({
        limit: isAutoSuggest ? limit : undefined,
        attributes: ['id', 'login', 'age'],
        where: condition,
      });
    } catch (error) {
      throw new Error(error?.message || 'Cannot find users.');
    }
  }

  async addUser(data) {
    try {
      const newUser = await this.model.create({ ...data, isDeleted: false, id: crypto.randomUUID() });
      return newUser.dataValues.id;
    } catch (error) {
      throw new Error(error?.message || 'Cannot add a new user.');
    }
  }

  async getUserById(userId) {
    try {
      const user = await this.model.findOne({
        where: { id: userId, isDeleted: false },
        attributes: ['id', 'login', 'age'],
      });

      if (!user) {
        throw new Error(`User ${userId} does not exist in the database`);
      }
      return user;
    } catch (error) {
      throw new Error(error?.message || `Cannot find user ${userId}`);
    }
  }

  async deleteUserById(userId) {
    try {
      const result = await this.model.update({ isDeleted: true }, { where: { id: userId } });
      if (!result[0]) {
        throw new Error(`User ${userId} does not exist in the database`);
      }
      return userId;
    } catch (error) {
      throw new Error(error?.message || `Cannot delete user ${userId}`);
    }
  }

  async updateUserById({ userId, data }) {
    try {
      const result = await this.model.update(data, { where: { id: userId } });
      if (!result[0]) {
        throw new Error(`User ${userId} does not exist in the database`);
      }
      return userId;
    } catch (error) {
      throw new Error(error?.message || `Cannot update user ${userId}`);
    }
  }
}
