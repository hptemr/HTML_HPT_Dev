const express = require('express');
const router = express.Router();
const adminCommonController = require('../controllers/adminCommonController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/changePassword', verifyToken, adminCommonController.changePassword);

module.exports = router;