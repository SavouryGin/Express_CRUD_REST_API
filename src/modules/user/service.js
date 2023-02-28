import bcrypt from 'bcrypt';
import crypto from 'crypto';

export default class UsersService {
  constructor(repo) {
    this.repo = repo;
  }

  async getAll(queryParams) {
    const { loginSubstring, limit } = queryParams;
    const isAutoSuggest = loginSubstring && loginSubstring.length && limit && Number.isInteger(+limit);

    return await this.repo.getAll({ isAutoSuggest, loginSubstring, limit });
  }

  async add(data) {
    const user = await this.prepareData(data);
    await this.repo.add(user);
  }

  async getById(userId) {
    return await this.repo.getById(userId);
  }

  async deleteById(userId) {
    await this.repo.deleteById(userId);
  }

  async updateById({ userId, data }) {
    await this.repo.updateById({ userId, data });
  }

  async prepareData(data) {
    const hashedPwd = await bcrypt.hash(data.password, 13);
    const newId = crypto.randomUUID();

    return { ...data, id: newId, isDeleted: false, password: hashedPwd };
  }

  async loginUser(login, password) {
    const user = await this.repo.getByLogin(login);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      return { id: user.id, login: user.login };
    } else {
      throw new Error(`Incorrect password entered for user ${login}`);
    }
  }
}
