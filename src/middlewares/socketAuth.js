const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { User } = require('../models');
const { tokenTypes } = require('../config/tokens');

const jwtVerify = async (payload) => {
  if (payload.type !== tokenTypes.ACCESS) {
    throw new Error('Invalid token type');
  }
  const user = await User.findById(payload.sub);
  if (!user) {
    throw new Error('User not found');
  }
  return user.toJSON();
};

const authSocketMiddleware = async (socket, next) => {
  try {
    // since you are sending the token with the query
    const { token } = socket.handshake.auth || {};

    const decoded = jwt.verify(token, config.jwt.secret);
    const user = await jwtVerify(decoded);
    // eslint-disable-next-line no-param-reassign
    socket.user = user;
  } catch (err) {
    return next(new Error('NOT AUTHORIZED'));
  }
  next();
};

module.exports = authSocketMiddleware;
