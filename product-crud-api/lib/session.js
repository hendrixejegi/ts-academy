const jwt = require('jsonwebtoken');
const Session = require('../db/models/session.model');
const { CustomError } = require('./error');

const TOKEN_TTL = '1h';

const ttlToDate = (ttl) => {
  const ms = {
    s: 1000,
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
  };

  const match = ttl.match(/^(\d+)([smhd])$/);
  if (!match) throw new Error('Invalid TTL format');

  const [, value, unit] = match;
  return new Date(Date.now() + value * ms[unit]);
};

const encrypt = async (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: TOKEN_TTL });

const decrypt = async (token) => jwt.verify(token, process.env.JWT_SECRET);

const createSession = async (res, user) => {
  const expires = ttlToDate(TOKEN_TTL);

  const options = {
    httpOnly: true,
    sameSite: 'strict',
    expires,
  };

  const payload = {
    id: user.id,
    admin: user.admin,
  };
  const token = await encrypt(payload);

  await Session.Model.create({ userId: payload.id, token, expires });

  res.cookie('product_api_token', token, options);
  return token;
};

const getSession = async (cookies) => {
  const token = cookies.product_api_token;

  if (!token) {
    throw new CustomError(401, {
      message: 'Unauthorized',
      code: 'unauthorized',
    });
  }
  return decrypt(token);
};

const deleteSession = async (res, userId) => {
  await Session.Model.deleteMany({ userId });
  res.clearCookie('product_api_token');
};

module.exports = { createSession, getSession, deleteSession, decrypt };
