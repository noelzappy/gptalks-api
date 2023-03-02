const httpStatus = require('http-status');
const { Chat, Message } = require('../models');
const ApiError = require('../utils/ApiError');

const createChat = async (chatBody) => {
  return Chat.create(chatBody);
};

const queryChats = async (filter, options) => {
  const chats = await Chat.paginate(filter, options);
  return chats;
};

const getChatById = async (id) => {
  return Chat.findById(id);
};

const updateChatById = async (chatId, updateBody) => {
  const chat = await getChatById(chatId);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }
  Object.assign(chat, updateBody);
  await chat.save();
  return chat;
};

const deleteChatById = async (chatId) => {
  const chat = await getChatById(chatId);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }

  await chat.remove();

  await Message.deleteMany({ chat: chatId });

  return chat;
};

module.exports = {
  createChat,
  queryChats,
  getChatById,
  updateChatById,
  deleteChatById,
};
