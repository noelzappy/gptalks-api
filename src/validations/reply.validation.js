const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReply = {
  body: Joi.object().keys({
    text: Joi.string().required(),
    post: Joi.string().custom(objectId).required(),
    parentReply: Joi.string().custom(objectId),
  }),
};

const getReplies = {
  query: Joi.object().keys({
    text: Joi.string(),
    post: Joi.string().custom(objectId),
    parentReply: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getReply = {
  params: Joi.object().keys({
    replyId: Joi.string().custom(objectId),
  }),
};

const updateReply = {
  params: Joi.object().keys({
    replyId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      text: Joi.string(),
    })
    .min(1),
};

const deleteReply = {
  params: Joi.object().keys({
    replyId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createReply,
  getReplies,
  getReply,
  deleteReply,
  updateReply,
};
