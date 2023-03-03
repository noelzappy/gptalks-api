const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const authSocketMiddleware = require('./middlewares/socketAuth');

const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { onConnection } = require('./socket');

const httpServer = createServer(app);

// Mongoose Strict Query Deprecation Warning suppression
mongoose.set('strictQuery', false);

let server;

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');

  const io = new SocketServer(httpServer);
  io.use(authSocketMiddleware);

  io.on('connection', onConnection);

  server = httpServer.listen(process.env.PORT || config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });

  // server = app.listen(config.port, () => {

  // });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
