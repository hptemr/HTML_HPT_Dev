const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/userLogin', authController.userLogin);
router.post('/forgotPassword', authController.forgotPassword);
router.get('/checkForgotPasswordToken/:userId/:token', authController.checkForgotPasswordTokenExpiry);
router.post('/resetPassword', authController.resetPassword);

module.exports = router;