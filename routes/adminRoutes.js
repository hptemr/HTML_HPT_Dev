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
router.post('/getTherapistList', adminController.getTherapistList);
router.post('/getLocationWiseUserList', adminController.getLocationWiseUserList);
router.post('/deleteProfileImage', adminController.deleteProfileImage);
router.post('/changeProfileImage', adminController.changeProfileImage);
router.post('/getDefaultDirectories', adminController.getDefaultDirectories);
router.post('/getDirectoryItems', adminController.getDirectoryItems);
router.post('/createDirectory', adminController.createDirectory);
router.post('/updateDirectory', adminController.updateDirectory);
router.post('/uploadDocumentFile', adminController.uploadDocumentFile);
router.post('/removeDocument', adminController.removeDirectoryOrFile);
router.post('/updateFile', adminController.updateFile);
router.post('/previewDocumentFile', adminController.previewDocumentFile);


module.exports = router;