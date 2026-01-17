const { getSession } = require('../lib/session');

const checkAuth = async (req, res, next) => {
  const { userId } = await getSession(req.cookies);

  req.userId = userId;
  next();
};

module.exports = checkAuth;
