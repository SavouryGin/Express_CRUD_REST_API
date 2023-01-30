import crypto from 'crypto';
import db from '../models/index.js';

const UsersDB = db.users;
const Op = db.Sequelize.Op;
let users = [];

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
    throw new Error(error?.message || 'Cannot find a user.');
  }
};

const deleteUserById = (req, res) => {
  const { id } = req.params;

  users = users.map((user) => {
    return user.id === id ? { ...user, isDeleted: true } : user;
  });

  res.send(`User with the id ${id} has been deleted.`);
};

const updateUserById = (req, res) => {
  const { id } = req.params;
  const { login, password, age, isDeleted } = req.body;

  const targetUser = users.find((item) => item.id === id);

  if (!targetUser) {
    res.status(404).send(`User with the id ${id} is not found.`);
  }

  const updatedUser = {
    ...targetUser,
    login: login || targetUser.login,
    password: password || targetUser.password,
    age: age || targetUser.age,
    isDeleted: isDeleted || targetUser.isDeleted,
  };

  users = users.map((user) => {
    return user.id === id ? updatedUser : user;
  });

  res.send(`User with the id ${id} has been updated.`);
};

const usersController = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
  updateUserById,
};

export default Object.freeze(usersController);
