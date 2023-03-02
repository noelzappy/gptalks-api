const httpStatus = require('http-status');
const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { messageService } = require('../services');


const createMessage = catchAsync(async (req, res) => {
  const message = await messageService.createMessage({ ...req.body, user: req.user.id, sender: 'user', read: true });
  res.status(httpStatus.CREATED).send(message);
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
