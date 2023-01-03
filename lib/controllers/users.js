import crypto from "crypto";

let users = [
  {
    id: "286ee862-8a86-11ed-a1eb-0242ac120002",
    login: "name@mail.com",
    password: "123qwerty",
    age: 30,
    isDeleted: false,
  },
];

const getAllUsers = (req, res) => {
  const activeUsers = users.filter((user) => !user.isDeleted);

  res.send(activeUsers);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const targetUser = users.find((user) => item.id === id && !user.isDeleted);

  res.send(targetUser);
};

const addUser = (req, res) => {
  const newUser = { ...req.body, isDeleted: false, id: crypto.randomUUID() };
  users.push(newUser);

  res.send(`User ${newUser.login} has been added to the list.`);
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
  const { login, password, age } = req.body;

  const userToUpdate = users.find((item) => item.id === id);

  const updatedUser = {
    ...userToUpdate,
    login: login || userToUpdate.login,
    password: password || userToUpdate.password,
    age: age || userToUpdate.age,
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
