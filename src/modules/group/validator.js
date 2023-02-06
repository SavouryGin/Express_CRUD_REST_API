import Joi from 'joi';

const add = Joi.object().keys({
  name: Joi.string().email().required(),
  password: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')).required(),
});

const update = Joi.object().keys({
  name: Joi.string().email(),
  password: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
});

const groupValidator = {
  add,
  update,
};

export default groupValidator;
