const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { chatController } = require('../../controllers');
const { chatValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(chatValidation.createChat), chatController.createChat)
  .get(auth(), validate(chatValidation.getChats), chatController.getChats);

router
  .route('/:chatId')
  .get(auth(), validate(chatValidation.getChat), chatController.getChat)
  .patch(auth(), validate(chatValidation.updateChat), chatController.updateChat)
  .delete(auth(), validate(chatValidation.deleteChat), chatController.deleteChat);

module.exports = router;
