const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const messageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },

    message: { type: String, required: true },
    sender: {
      type: String,
      required: true,
      enum: ['user', 'bot'],
    },

    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
