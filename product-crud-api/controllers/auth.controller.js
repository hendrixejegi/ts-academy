const User = require('../db/models/user.model');
const { createSession, deleteSession } = require('../lib/session');
const { zodParse, sendSuccess, sendError } = require('../lib/utils');
const bcrypt = require('bcryptjs');

const signUpWithEmail = async (req, res) => {
  const allowed = zodParse(User.SignUpSchema, req.body);

  // hash password before store
  const hash = await bcrypt.hash(allowed.password, 10);
  const user = new User.Model({ ...allowed, password: hash });
  await user.save();

  const token = await createSession(res, user.id);

  const { password, ...rest } = user._doc;
  sendSuccess(res, 201, { data: { token, rest } });
};

const signInWithEmail = async (req, res) => {
  const allowed = zodParse(User.SignInSchema, req.body);
  const { email, password } = allowed;

  const user = await User.Model.findOne({ email });

  const isMatch = await (async () => {
    if (!user) {
      return false;
    }

    return bcrypt.compare(password, user.password);
  })();

  if (!isMatch) {
    return sendError(res, 400, { message: 'Incorrect email or password.' });
  }
  const token = await createSession(res, user.id);

  const { password: hash, ...rest } = user._doc;
  sendSuccess(res, 200, { data: { token, rest } });
};

const signOut = async (req, res) => {
  const { userId } = req;
  await deleteSession(res, userId);
  sendSuccess(res, 200, {});
};

module.exports = { signUpWithEmail, signInWithEmail, signOut };
