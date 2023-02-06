import Joi from 'joi';

const add = Joi.object().keys({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')).required(),
});

const update = Joi.object().keys({
  name: Joi.string(),
  permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
});

const groupValidator = {
  add,
  update,
};

export default groupValidator;
