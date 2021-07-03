const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.post('/register', usersController.registerPost);
router.post('/login', usersController.loginPost);
router.post('/logout', usersController.logoutPost)
router.get('/check-session', usersController.checkSession)

module.exports = router;