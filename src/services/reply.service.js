const httpStatus = require('http-status');
const { Reply } = require('../models');
const ApiError = require('../utils/ApiError');

const createReply = async (replyBody) => {
  return Reply.create(replyBody);
};

const queryReplies = async (filter, options) => {
  const replies = await Reply.paginate(filter, options);
  return replies;
};

const getReplyById = async (id) => {
  const reply = await Reply.findById(id);
  return reply;
};

const updateReplyById = async (replyId, updateBody) => {
  const reply = await getReplyById(replyId);
  if (!reply) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reply not found');
  }
  Object.assign(reply, updateBody);
  await reply.save();
  return reply;
};

const deleteReplyById = async (replyId) => {
  const reply = await getReplyById(replyId);
  if (!reply) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reply not found');
  }
  await reply.remove();
  await Reply.deleteMany({ parentReply: replyId });
  return reply;
};

module.exports = {
  createReply,
  queryReplies,
  getReplyById,
  deleteReplyById,
  updateReplyById,
};
