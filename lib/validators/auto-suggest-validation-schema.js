import Joi from 'joi';

const schema = Joi.object().keys({
  loginSubstring: Joi.string().required(),
  limit: Joi.number().integer().min(1).required(),
});

export default schema;
