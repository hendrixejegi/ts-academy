const express = require('express');
const {
  signUpWithEmail,
  signInWithEmail,
  signOut,
} = require('../controllers/auth.controller');

const router = express.Router();

router.route('/sign-up/email').post(signUpWithEmail);
router.route('/sign-in/email').post(signInWithEmail);
router.route('/sign-out').post(signOut);

module.exports = router;
