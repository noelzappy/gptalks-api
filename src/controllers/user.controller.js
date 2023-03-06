const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const getMe = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  res.send(user);
});

const updateMe = catchAsync(async (req, res) => {
  delete req.body.avatar;
  if (req.file) {
    req.body.avatar = req.file.path;
  }
  const user = await userService.updateUserById(req.user.id, req.body);
  res.send(user);
});

module.exports = {
  getMe,
  updateMe,
};
