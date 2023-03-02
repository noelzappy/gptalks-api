const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { messageController } = require('../../controllers');
const { messageValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(messageValidation.createMessage), messageController.createMessage)
  .get(auth(), validate(messageValidation.getMessages), messageController.getMessages);

router.route('/:messageId').delete(auth(), validate(messageValidation.deleteMessage), messageController.deleteMessage);

module.exports = router;
