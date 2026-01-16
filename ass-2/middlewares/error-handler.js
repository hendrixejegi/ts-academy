const { config } = require('dotenv');
const { CustomError, getErrorMessage } = require('../lib/error');
const { sendError } = require('../lib/utils');

const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    next(err);
  }

  if (config.env === 'development') {
    console.log(err);
  }

  if (err instanceof CustomError) {
    return sendError(res, err.status, err.detail);
  }

  sendError(res, 500, { message: 'Internal server error' });
};

module.exports = errorHandler;
