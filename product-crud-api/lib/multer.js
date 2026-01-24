const multer = require('multer');
const { MAX_UPLOAD_SIZE_BYTES } = require('./constants');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter(req, file, cb) {
    const valid = ['image/jpeg', 'image/png'];

    if (!valid.includes(file.mimetype)) {
      return cb(null, false);
    }

    return cb(null, true);
  },
  limits: {
    files: 1,
    fileSize: MAX_UPLOAD_SIZE_BYTES, // 5 MB
  },
});

module.exports = { upload };
