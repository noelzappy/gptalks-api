const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

const createPost = async (postBody) => {
  return Post.create(postBody);
};

const queryPosts = async (filter, options) => {
  const posts = await Post.paginate(filter, options);
  return posts;
};

const getPostById = async (id) => {
  const post = Post.findById(id);
  return post;
};

const updatePostById = async (postId, updateBody) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  Object.assign(post, updateBody);
  await post.save();
  return post;
};

const deletePostById = async (postId) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await post.remove();
  return post;
};

module.exports = {
  createPost,
  queryPosts,
  getPostById,
  deletePostById,
  updatePostById,
};
