const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller')

router.post('/signup', authController.postUserSignUp)

router.post('/login', authController.postUserLogin)

module.exports = router; 