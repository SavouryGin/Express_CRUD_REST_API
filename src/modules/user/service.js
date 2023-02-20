import bcrypt from 'bcrypt';
import crypto from 'crypto';

export default class UsersService {
  constructor({ userModel, groupModel, operators, sequelize }) {
    this.userModel = userModel;
    this.groupModel = groupModel;
    this.sequelize = sequelize;
    this.Op = operators;
    this.includeOptions = [
      {
        model: groupModel,
        as: 'groups',
        required: false,
        attributes: ['id', 'name', 'permissions'],
        through: { attributes: [] },
      },
    ];
  }

  async getAll(queryParams) {
    try {
      const { loginSubstring, limit } = queryParams;
      const isAutoSuggest = loginSubstring && loginSubstring.length && limit && Number.isInteger(+limit);
      const condition = isAutoSuggest
        ? {
            isDeleted: false,
            login: { [this.Op.substring]: loginSubstring },
          }
        : { isDeleted: false };

      return await this.userModel.findAll({
        limit: isAutoSuggest ? limit : undefined,
        attributes: ['id', 'login', 'age'],
        where: condition,
        include: this.includeOptions,
      });
    } catch (error) {
      throw new Error(error?.message || 'getAll() error');
    }
  }

  async add(data) {
    const transaction = await this.sequelize.transaction();
    try {
      const preparedData = await this.prepareData(data);
      const newUser = await this.userModel.create(preparedData);
      await transaction.commit();
      return newUser.dataValues.id;
    } catch (error) {
      await transaction.rollback();
      throw new Error(error?.message || 'add() error');
    }
  }

  async getById(userId) {
    try {
      const user = await this.userModel.findOne({
        where: { id: userId, isDeleted: false },
        attributes: ['id', 'login', 'age'],
        include: this.includeOptions,
      });

      if (!user) {
        throw new Error(`User ${userId} does not exist in the database`);
      }
      return user;
    } catch (error) {
      throw new Error(error?.message || 'getById() error');
    }
  }

  async deleteById(userId) {
    const transaction = await this.sequelize.transaction();
    try {
      const result = await this.userModel.update({ isDeleted: true }, { where: { id: userId } });
      if (!result[0]) {
        await transaction.rollback();
        throw new Error(`User ${userId} does not exist in the database`);
      }

      await transaction.commit();
      return userId;
    } catch (error) {
      await transaction.rollback();
      throw new Error(error?.message || 'deleteById() error');
    }
  }

  async updateById({ userId, data }) {
    const transaction = await this.sequelize.transaction();
    try {
      const result = await this.userModel.update(data, { where: { id: userId } });
      if (!result[0]) {
        await transaction.rollback();
        throw new Error(`User ${userId} does not exist in the database`);
      }

      await transaction.commit();
      return userId;
    } catch (error) {
      await transaction.rollback();
      throw new Error(error?.message || 'updateById() error');
    }
  }

  async prepareData(data) {
    const hashedPwd = await bcrypt.hash(data.password, 13);
    const newId = crypto.randomUUID();

    return { ...data, id: newId, isDeleted: false, password: hashedPwd };
  }
}
