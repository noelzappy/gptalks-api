const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { chatService } = require('../services');

const createChat = catchAsync(async (req, res) => {
  const chat = await chatService.createChat({ ...req.body, user: req.user.id });
  res.status(httpStatus.CREATED).send(chat);
});

const getChats = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['subject']);
  filter.user = req.user.id;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await chatService.queryChats(filter, options);
  res.send(result);
});

const getChat = catchAsync(async (req, res) => {
  const chat = await chatService.getChatById(req.params.chatId);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }
  res.send(chat);
});

const updateChat = catchAsync(async (req, res) => {
  const chat = await chatService.updateChatById(req.params.chatId, req.body);
  res.send(chat);
});

const deleteChat = catchAsync(async (req, res) => {
  await chatService.deleteChatById(req.params.chatId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createChat,
  getChats,
  getChat,
  updateChat,
  deleteChat,
};
