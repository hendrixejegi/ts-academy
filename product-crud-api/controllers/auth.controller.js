const User = require('../db/models/user.model');
const { createSession } = require('../lib/session');
const { zodParse, sendSuccess } = require('../lib/utils');
const bcrypt = require('bcryptjs');

const signUpWithEmail = async (req, res) => {
  const allowed = zodParse(User.InputSchema, req.body);

  // hash password before store
  const hash = await bcrypt.hash(allowed.password, 10);

  const user = new User.Model({ ...allowed, password: hash });
  // await user.save();

  const token = await createSession(res, user.id);

  const { password, ...rest } = user._doc;
  sendSuccess(res, 201, { data: { token, rest } });
};

const signInWithEmail = async (req, res) => {};

const signOut = async (req, res) => {};

module.exports = { signUpWithEmail, signInWithEmail, signOut };
