const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { postController } = require('../../controllers');
const { postValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(postValidation.createPost), postController.createPost)
  .get(auth(), validate(postValidation.getPosts), postController.getPosts);

router
  .route('/:postId')
  .delete(auth(), validate(postValidation.deletePost), postController.deletePost)
  .get(auth(), validate(postValidation.getPost), postController.getPost)
  .put(auth(), validate(postValidation.updatePost), postController.updatePost);

module.exports = router;
