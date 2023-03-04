const express = require('express');
const config = require('../../config/config');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const chatRoute = require('./chat.route');
const messageRoute = require('./message.route');
const postRoute = require('./post.route');
const replyRoute = require('./reply.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/chats',
    route: chatRoute,
  },
  {
    path: '/messages',
    route: messageRoute,
  },
  {
    path: '/posts',
    route: postRoute,
  },
  {
    path: '/replies',
    route: replyRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
