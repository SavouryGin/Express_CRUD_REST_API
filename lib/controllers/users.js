import crypto from 'crypto';

let users = [
  {
    id: '286ee862-8a86-11ed-a1eb-0242ac120002',
    login: 'John@mail.com',
    password: '123qwerty',
    age: 30,
    isDeleted: false,
  },
  {
    id: '9c76d67e-9004-11ed-a1eb-0242ac120002',
    login: 'Helen@gmail.com',
    password: '123qwerty',
    age: 42,
    isDeleted: false,
  },
  {
    id: 'c96e2248-8b6f-11ed-a1eb-0242ac120002',
    login: 'Garry@hotmail.com',
    password: '123qwerty',
    age: 23,
    isDeleted: true,
  },
];

const getAllUsers = (req, res) => {
  const { loginSubstring, limit } = req.query;
  const isAutoSuggestRequest = loginSubstring && loginSubstring.length && limit && Number.isInteger(+limit);

  const activeUsers = users.filter((user) => !user.isDeleted);

  if (isAutoSuggestRequest) {
    const filteredUsers = activeUsers.filter((user) => user.login.includes(loginSubstring)).slice(0, +limit);
    res.send(filteredUsers);
  } else {
    res.send(activeUsers);
  }
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const targetUser = users.find((user) => user.id === id && !user.isDeleted);

  if (!targetUser) {
    res.status(404).send(`User with the id ${id} is not found.`);
  } else {
    res.send(targetUser);
  }
};

const addUser = (req, res) => {
  const newUser = { ...req.body, isDeleted: false, id: crypto.randomUUID() };
  users.push(newUser);

  res.send(`User with the id ${newUser.id} has been added to the list.`);
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
