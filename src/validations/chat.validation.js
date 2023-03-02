const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createChat = {
  body: Joi.object().keys({
    subject: Joi.string().required(),
  }),
};

const getChats = {
  query: Joi.object().keys({
    subject: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getChat = {
  params: Joi.object().keys({
    chatId: Joi.string().custom(objectId),
  }),
};

const updateChat = {
  params: Joi.object().keys({
    chatId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      subject: Joi.string().required(),
    })
    .min(1),
};

const deleteChat = {
  params: Joi.object().keys({
    chatId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createChat,
  getChats,
  getChat,
  deleteChat,
  updateChat,
};
