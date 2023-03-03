const chatSocket = require('./chat.socket');

const onConnection = (socket) => {
  chatSocket(socket);
};

module.exports = {
  onConnection,
};
