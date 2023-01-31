import crypto from 'crypto';
import bcrypt from 'bcrypt';

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
      throw new Error(error?.message || 'getAllUsers() error');
    }
  }

  async addUser(data) {
    try {
      const preparedData = await this.prepareUserData(data);
      const newUser = await this.model.create(preparedData);
      return newUser.dataValues.id;
    } catch (error) {
      throw new Error(error?.message || 'addUser() error');
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
      throw new Error(error?.message || 'getUserById() error');
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
      throw new Error(error?.message || 'deleteUserById() error');
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
      throw new Error(error?.message || 'updateUserById() error');
    }
  }

  async prepareUserData(data) {
    const newId = crypto.randomUUID();
    const hashedPwd = await bcrypt.hash(data.password, 13);

    return { ...data, isDeleted: false, id: newId, password: hashedPwd };
  }
}
