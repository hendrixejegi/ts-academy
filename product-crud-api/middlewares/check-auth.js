const { getSession } = require('../lib/session');

const checkAuth = async (req, res, next) => {
  const payload = await getSession(req.cookies);

  req.user = payload;
  next();
};

module.exports = checkAuth;
