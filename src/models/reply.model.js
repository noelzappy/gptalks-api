const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const replySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    text: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    parentReply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reply',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
replySchema.plugin(toJSON);
replySchema.plugin(paginate);

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
