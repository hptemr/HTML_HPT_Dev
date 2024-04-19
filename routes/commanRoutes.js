const express = require('express');
const router = express.Router();
const commanController = require('../controllers/commanController');

router.get('/getPracticeLocation', commanController.getPracticeLocation);

module.exports = router;