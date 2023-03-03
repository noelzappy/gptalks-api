const httpStatus = require('http-status');
const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { messageService } = require('../services');
const gpt = require('../config/gpt');

const createMessage = catchAsync(async (req, res) => {
  const result = await gpt.api.sendMessage(req.body.message, {
    parentMessageId: req.body.parentMessageId,
  });

  const userMessage = {
    ...req.body,
    user: req.user.id,
    sender: 'user',
    read: true,
    parentMessageId: result.parentMessageId,
  };
  const botMessage = {
    chat: req.body.chat,
    user: req.user.id,
    sender: 'bot',
    message: result.text,
    read: false,
    parentMessageId: result.parentMessageId,
  };

  const messages = await messageService.createMessages([userMessage, botMessage]);

  res.status(httpStatus.CREATED).send(messages[1]);
});

const getMessages = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['chat']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await messageService.queryMessages(filter, options);
  res.send(result);
});

const deleteMessage = catchAsync(async (req, res) => {
  await messageService.deleteMessageById(req.params.messageId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
};
