const httpStatus = require('http-status');
const { Message } = require('../models');
const ApiError = require('../utils/ApiError');

const createMessage = async (messageBody) => {
  return Message.create(messageBody);
};

const createMessages = async (messages) => {
  return Message.insertMany(messages);
};

const queryMessages = async (filter, options) => {
  const messages = await Message.paginate(filter, options);
  return messages;
};

const getMessageById = async (id) => {
  return Message.findById(id);
};

const deleteMessageById = async (messageId) => {
  const message = await getMessageById(messageId);
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
  }
  await message.remove();
  return message;
};

const getLast50Messages = async (chatId) => {
  const messages = await Message.find({ chat: chatId }).sort({ createdAt: -1 }).limit(50).exec();
  return messages;
};

module.exports = {
  createMessage,
  queryMessages,
  getMessageById,
  deleteMessageById,
  createMessages,
  getLast50Messages,
};
