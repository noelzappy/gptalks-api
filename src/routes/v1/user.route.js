const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userController } = require('../../controllers');
const { userValidation } = require('../../validations');
const upload = require('../../middlewares/uploads');

const router = express.Router();

router
  .route('/me')
  .get(auth(), userController.getMe)
  .put(auth(), upload.single('avatar'), validate(userValidation.updateMe), userController.updateMe);

module.exports = router;
