import Joi from "joi";

const schema = Joi.object().keys({
  login: Joi.string().email().required(),
  password: Joi.string().min(4).alphanum().required(),
  age: Joi.number().integer().min(4).max(130),
});

export default schema;
