import AbstractRepository from './abstract-repository.js';

export default class UserRepository extends AbstractRepository {
  constructor(db) {
    super();
    this.userModel = db.User;
    this.groupModel = db.Group;
    this.Op = db.Sequelize.Op;
    this.sequelize = db.sequelize;
  }

  async exists(user) {
    const result = await this.userModel.findOne({
      where: { id: user.id.toString() },
    });
    return !!result === true;
  }

  async getAll({ isAutoSuggest, loginSubstring, limit }) {
    try {
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
      });
    } catch (error) {
      throw new Error(error?.message || 'getAll() error');
    }
  }

  async getById(userId) {
    try {
      const user = await this.userModel.findOne({
        where: { id: userId, isDeleted: false },
        attributes: ['id', 'login', 'age'],
      });

      if (!user) {
        throw new Error(`User ${userId} does not exist in the database`);
      }
      return user;
    } catch (error) {
      throw new Error(error?.message || 'getById() error');
    }
  }

  async add(user) {
    let t;
    try {
      t = await this.sequelize.transaction();
      const exists = await this.exists(user.id);

      if (exists) {
        throw new Error(`User ${user.id} already exists`);
      }

      await this.userModel.create(user, { transaction: t });
      await t.commit();
    } catch (error) {
      if (t) await t.rollback();
      throw new Error(error?.message || 'add() method error');
    }
  }

  async deleteById(userId) {
    let t;
    try {
      t = await this.sequelize.transaction();
      const exists = await this.exists(userId);

      if (!exists) {
        throw new Error(`User ${userId} does not exist in the database`);
      }

      await this.userModel.update({ isDeleted: true }, { where: { id: userId } }, { transaction: t });
      await t.commit();
    } catch (error) {
      if (t) await t.rollback();
      throw new Error(error?.message || 'deleteById() error');
    }
  }

  async updateById({ userId, data }) {
    let t;
    try {
      t = await this.sequelize.transaction();
      const exists = await this.exists(userId);

      if (!exists) {
        throw new Error(`User ${userId} does not exist in the database`);
      }

      await this.userModel.update(data, { where: { id: userId } }, { transaction: t });
      await t.commit();
    } catch (error) {
      if (t) await t.rollback();
      throw new Error(error?.message || 'updateById() error');
    }
  }
}
