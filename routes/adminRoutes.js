const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/systemAdmin/signUp', adminController.systemAdminSignUp);

router.post('/invite', verifyToken, adminController.invite);
router.post('/changePassword', verifyToken, adminController.changePassword);
router.post('/profile', verifyToken, adminController.profile);
router.post('/updateProfile', verifyToken, adminController.updateProfile);
router.post('/updateUser', adminController.updateUser);
router.post('/getUserDetails', adminController.getUserDetails);
router.post('/getUserList', adminController.getUserList);
router.post('/deleteProfileImage', adminController.deleteProfileImage);
router.post('/changeProfileImage', adminController.changeProfileImage);


module.exports = router;