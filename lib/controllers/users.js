import crypto from "crypto";

const users = [
  {
    id: "286ee862-8a86-11ed-a1eb-0242ac120002",
    login: "name@mail.com",
    password: "123qwerty",
    age: 30,
    isDeleted: false,
  },
];

const getAllUsers = (req, res) => {
  console.log(users);
  res.send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const result = users.find((item) => item.id === id);

  res.send(`Get by id the user ${JSON.stringify(result)}`);
};

const addUser = (req, res) => {
  const user = { ...req.body, id: crypto.randomUUID() };
  users.push(user);

  res.send(`User ${user.login} is added.`);
};

const deleteUserById = (req, res) => {
  const { id } = req.params;

  const result = users.filter((item) => item.id !== id);

  res.send(`Deleted. Result: ${JSON.stringify(result)}`);
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

  res.send(`Updated user is ${JSON.stringify(updatedUser)}`);
};

const usersController = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
  updateUserById,
};

export default Object.freeze(usersController);
