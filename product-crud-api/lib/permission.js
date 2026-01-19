const User = require('../db/models/user.model');
const { CustomError } = require('./error');

const ACTIONS = {
  CAN_WRITE: 'CAN_WRITE',
  CAN_UPDATE: 'CAN_UPDATE',
  CAN_DELETE: 'CAN_DELETE',
};

const userActions = Object.values(ACTIONS).filter(
  (action) => action !== ACTIONS.CAN_DELETE,
);
const adminActions = Object.values(ACTIONS);

const checkPerm = async (isAdmin, action) => {
  if (
    (!isAdmin && userActions.includes(action)) ||
    (isAdmin && adminActions.includes(action))
  ) {
    return true;
  }

  throw new CustomError(403, {
    message: 'User lacks necessary permission',
    code: 'forbidden',
  });
};

module.exports = { ACTIONS, checkPerm };
