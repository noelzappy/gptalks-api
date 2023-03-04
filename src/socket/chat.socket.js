const gpt = require('../config/gpt');
const { messageService } = require('../services');

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
    socket.disconnect();
  };

  const onMessage = async (data) => {
    try {
      const { user } = socket;
      const { chat, message, parentMessageId } = data;

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

      const userMessage = {
        ...data,
        user: user.id,
        sender: 'user',
        read: true,
        parentMessageId: result.parentMessageId,
      };

      const messages = await messageService.createMessages([userMessage, botMessage]);

      socket.to(data.chat).emit(
        'message',
        messages.map((msg) => msg.toJSON())
      );
      socket.to(data.chat).emit('stopTyping', {});
    } catch (e) {
      socket.to(data.chat).emit('message', { message: 'Error', sender: 'bot' });
    }
  };

  socket.on('joinChat', onJoinChat);
  socket.on('leaveChat', onLeaveChat);
  socket.on('message', onMessage);
};
