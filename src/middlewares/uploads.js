const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },

  filename: (req, file, cb) => {
    cb(null, `${crypto.randomUUID()}-${file.originalname}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
