class CustomError extends Error {
  constructor({ statusCode, message }) {
    super();
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
  }
}

const getErrorMessage = (err) => {
  if (typeof err === 'object' && 'message' in err) {
    return err.message;
  }

  if (err instanceof CustomError) {
    return err.message;
  }

  if (typeof err === 'string') {
    return err;
  }

  return null;
};

module.exports = { CustomError, getErrorMessage };
