const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

router.post('/register', UserController.RegisterUser);
router.post('/login', UserController.LoginUser);

module.exports = router;