import crypto from 'crypto';
import db from '../models/index.js';

const UsersDB = db.users;
const Op = db.Sequelize.Op;

const getAllUsers = async (queryParams) => {
  try {
    const { loginSubstring, limit } = queryParams;
    const isAutoSuggest = loginSubstring && loginSubstring.length && limit && Number.isInteger(+limit);
    const condition = isAutoSuggest
      ? {
          isDeleted: false,
          login: { [Op.substring]: loginSubstring },
        }
      : { isDeleted: false };

    return await UsersDB.findAll({
      limit: isAutoSuggest ? limit : undefined,
      attributes: ['id', 'login', 'age'],
      where: condition,
    });
  } catch (error) {
    throw new Error(error?.message || 'Cannot find users.');
  }
};

const addUser = async (data) => {
  try {
    const newUser = await UsersDB.create({ ...data, isDeleted: false, id: crypto.randomUUID() });
    return newUser.dataValues.id;
  } catch (error) {
    throw new Error(error?.message || 'Cannot add a new user.');
  }
};

const getUserById = async (userId) => {
  try {
    const user = await UsersDB.findOne({
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
};

const deleteUserById = async (userId) => {
  try {
    await UsersDB.destroy({ where: { id: userId } });
    return userId;
  } catch (error) {
    throw new Error(error?.message || `Cannot delete user ${userId}`);
  }
};

const updateUserById = async ({ userId, data }) => {
  try {
    const result = await UsersDB.update(data, { where: { id: userId } });
    if (!result[0]) {
      throw new Error(`User ${userId} does not exist in the database`);
    }
    return userId;
  } catch (error) {
    throw new Error(error?.message || `Cannot update user ${userId}`);
  }
};

const usersController = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
  updateUserById,
};

export default Object.freeze(usersController);
