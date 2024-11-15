const express = require('express');
const router = express.Router();
const tebraController = require('../controllers/tebraController');

router.get('/GetPractices', tebraController.GetPractices);

module.exports = router;