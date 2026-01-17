const express = require('express');
const { signUpWithEmail } = require('../controllers/auth.controller');

const router = express.Router();

router.route('/sign-up/email').post(signUpWithEmail);

module.exports = router;
