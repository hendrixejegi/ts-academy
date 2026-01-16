const z = require('zod');
const products = require('../db/products');
const { CustomError } = require('./error');

/**
 *
 * @param {z.ZodType} Schema
 * @param {*} inputData
 */
const zodParse = (Schema, inputData) => {
  try {
    const result = Schema.parse(inputData);
    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errDetail = {
        message: z.prettifyError(error),
        code: 'invalid_input',
        detail: error,
      };

      throw new CustomError(400, errDetail);
    }
  }
};

/**
 *
 * @param {Express.Response} res
 * @param {number} status
 * @param {{message: string, data: unknown}} args
 */
const sendSuccess = (res, status, args) => {
  const successSchema = z.strictObject({
    message: z.string().optional(),
    data: z.looseObject().optional(),
  });

  try {
    const result = successSchema.parse(args);
    res.status(status).json({
      type: 'success',
      ...result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
    }

    // throw error to error middleware so it returns 500 to where the request came from
    throw Error();
  }
};

/**
 *
 * @param {Express.Response} res
 * @param {number} status
 * @param {{message: string, code: string, details: unknown}} args
 */
const sendError = (res, status, args) => {
  const errorSchema = z.strictObject({
    message: z.string(),
    code: z.string().optional(),
    detail: z.looseObject().optional(),
  });

  try {
    const result = errorSchema.parse(args);
    res.status(status).json({
      type: 'error',
      error: { ...result },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
    }

    sendError(res, 500, { message: 'Internal server error' });
  }
};

module.exports = {
  zodParse,
  sendSuccess,
  sendError,
};
