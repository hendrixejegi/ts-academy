const { CustomError, getErrorMessage } = require('../lib/error');

const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    next(err);
  }

  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ success: err.success, message: err.message });
  }

  res.status(500).json({
    success: false,
    message: getErrorMessage(err) || 'Internal Server Error',
  });
};

module.exports = errorHandler;
