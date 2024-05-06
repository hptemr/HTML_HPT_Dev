const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/systemAdmin/signUp', adminController.systemAdminSignUp);

router.post('/invite', verifyToken, adminController.invite);
router.post('/changePassword', verifyToken, adminController.changePassword);
router.post('/users', verifyToken, adminController.getAdminUsers);
router.post('/profile', verifyToken, adminController.profile);
router.post('/updateProfile', verifyToken, adminController.updateProfile);
router.post('/updateUser', adminController.updateUser);
router.post('/getUserDetails', adminController.getUserDetails);
router.post('/getUserList', adminController.getUserList);

module.exports = router;