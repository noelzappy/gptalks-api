const crypto = require('crypto');
const gpt = require('../config/gpt');
const { chatService, messageService } = require('../services');

module.exports = (socket) => {
  const onJoinChat = async (data) => {
    socket.join(data.chatId);
    socket.emit('loadingMessages', {});

    const messages = await messageService.getLast50Messages(data.chatId);

    socket.emit(
      'joinedChat',
      messages.map((message) => message.toJSON())
    );

    socket.emit('stopLoadingMessages', {});
  };

  const onLeaveChat = async (data) => {
    socket.leave(data.chatId);
    // broadcast to all users in the room
    socket.to(data.chatId).emit('leaveChat', {
      user: socket.user,
    });
  };

  const onMessage = async (data) => {
    try {
      const { user } = socket;
      const { chat, message, parentMessageId } = data;

      const userMessage = {
        ...data,
        user: user.id,
        sender: 'user',
        read: true,
        id: crypto.randomBytes(16).toString('hex'),
      };

      socket.to(data.chat).emit('messageSent', userMessage);

      delete userMessage.id;

      const result = await gpt.api.sendMessage(message, {
        parentMessageId,
        onProgress: (partialResponse) => {
          socket.to(data.chat).emit('typing', {
            message: partialResponse.text,
            parentMessageId: partialResponse.parentMessageId,
            read: true,
            sender: 'bot',
          });
        },
      });

      const botMessage = {
        chat,
        user: user.id,
        sender: 'bot',
        message: result.text,
        read: false,
        parentMessageId: result.parentMessageId,
      };

      const messages = await messageService.createMessages([userMessage, botMessage]);

      socket.to(data.chat).emit('message', messages[1].toJSON());
      socket.to(data.chat).emit('stopTyping', {});
    } catch (e) {
      socket.to(data.chat).emit('message', { message: 'Error', sender: 'bot' });
    }
  };

  socket.on('joinChat', onJoinChat);
  socket.on('leaveChat', onLeaveChat);
  socket.on('message', onMessage);
};
