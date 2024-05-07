const express = require('express');
const router = express.Router();
const emailTemplateController = require('../controllers/emailTemplateController');

router.post('/emailSend', emailTemplateController.emailSend);

module.exports = router;