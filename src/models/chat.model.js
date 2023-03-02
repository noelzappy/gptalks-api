const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const chatSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      default: 'General',
    },
    parentMessageId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
