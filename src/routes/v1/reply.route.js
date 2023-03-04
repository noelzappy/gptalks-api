const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { replyController } = require('../../controllers');
const { replyValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(replyValidation.createReply), replyController.createReply)
  .get(auth(), validate(replyValidation.getReplies), replyController.getReplies);

router
  .route('/:replyId')
  .delete(auth(), validate(replyValidation.deleteReply), replyController.deleteReply)
  .get(auth(), validate(replyValidation.getReply), replyController.getReply)
  .put(auth(), validate(replyValidation.updateReply), replyController.updateReply);

module.exports = router;
