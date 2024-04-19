const express = require('express');
const router = express.Router();
const systemAdminController = require('../controllers/systemAdminController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/signUp', systemAdminController.signUp);
router.get('/profile', verifyToken, systemAdminController.profile);
router.post('/updateProfile', verifyToken, systemAdminController.updateProfile);
router.post('/changePassword', verifyToken, systemAdminController.changePassword);

module.exports = router;