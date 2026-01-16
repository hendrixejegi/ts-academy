class CustomError extends Error {
  /**
   *
   * @param number status
   * @param {{message: string, code: string, details: unknown}} detail
   */
  constructor(status, detail) {
    super();
    this.status = status;
    this.detail = detail;
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
