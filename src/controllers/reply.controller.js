const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { replyService } = require('../services');

const createReply = catchAsync(async (req, res) => {
  const reply = await replyService.createReply({ ...req.body, user: req.user.id });
  res.status(httpStatus.CREATED).send(reply);
});

const getReplies = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['text', 'post', 'parentReply']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'user';
  const result = await replyService.queryReplies(filter, options);
  res.send(result);
});

const getReply = catchAsync(async (req, res) => {
  const reply = await replyService.getReplyById(req.params.replyId);
  if (!reply) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reply not found');
  }
  res.send(reply);
});

const updateReply = catchAsync(async (req, res) => {
  const reply = await replyService.updateReplyById(req.params.replyId, req.body);
  res.send(reply);
});

const deleteReply = catchAsync(async (req, res) => {
  await replyService.deleteReplyById(req.params.replyId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createReply,
  getReplies,
  getReply,
  updateReply,
  deleteReply,
};
