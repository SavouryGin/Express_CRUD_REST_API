import Joi from 'joi';

const add = Joi.object().keys({
  login: Joi.string().email().required(),
  password: Joi.string().min(4).alphanum().required(),
  age: Joi.number().integer().min(4).max(130),
});

const update = Joi.object().keys({
  login: Joi.string().email(),
  password: Joi.string().min(4).alphanum(),
  age: Joi.number().integer().min(4).max(130),
});

const login = Joi.object().keys({
  login: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userValidator = {
  add,
  update,
  login,
};

export default userValidator;
