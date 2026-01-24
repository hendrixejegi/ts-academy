const { Router } = require('express');
const checkAuth = require('../middlewares/check-auth');
const { createTodo } = require('../controllers/todo.controller');

const router = Router();

router.route('/:jsonId').post([checkAuth, createTodo]);

module.exports = router;
