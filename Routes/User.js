const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

router.post('/register', UserController.RegisterUser);
router.post('/login', UserController.LoginUser);
router.post('/logout', UserController.LogoutUser);
router.post('/sendSMS', UserController.sendSMS);

module.exports = router;