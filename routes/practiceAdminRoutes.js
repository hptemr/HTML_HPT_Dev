const express = require('express');
const router = express.Router();
const practiceAdminController = require('../controllers/practiceAdminController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/invite', verifyToken, practiceAdminController.invite);
router.get('/users', verifyToken, practiceAdminController.getPracticeAdminUsers);
router.get('/profile/:userId', verifyToken, practiceAdminController.profile);

module.exports = router;