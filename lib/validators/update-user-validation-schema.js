import Joi from 'joi';

const schema = Joi.object().keys({
  login: Joi.string().email(),
  password: Joi.string().min(4).alphanum(),
  age: Joi.number().integer().min(4).max(130),
  isDeleted: Joi.boolean(),
});

export default schema;
