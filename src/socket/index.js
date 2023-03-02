const { Server } = require('socket.io');
const logger = require('../config/logger');

let io;

const startServer = (server) => {
  io = new Server(server);
  logger.info('Socket.io server started');

  io.on('connection', (socket) => {
    logger.info(`Socket ${socket.id} connected`);
  });
};

const getIO = () => {
  if (!io) {
    return null;
  }
  return io;
};

module.exports = {
  startServer,
  getIO,
};
