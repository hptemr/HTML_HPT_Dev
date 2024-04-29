const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const commonMiddleware = require('../middlewares/commonMiddleware ');

router.post('/userLogin', commonMiddleware.checkLoginValidation, authController.userLogin);
router.post('/forgotPassword', authController.forgotPassword);
router.get('/checkForgotPasswordToken', authController.checkForgotPasswordTokenExpiry);
router.post('/resetPassword', authController.resetPassword);

module.exports = router;