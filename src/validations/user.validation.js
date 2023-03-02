const Joi = require('joi');
const { password } = require('./custom.validation');

const updateMe = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().custom(password),
  }),
};

module.exports = {
  updateMe,
};
