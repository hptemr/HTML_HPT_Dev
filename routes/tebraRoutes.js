const express = require('express');
const router = express.Router();
const tebraController = require('../controllers/tebraController');

router.get('/getPractices', tebraController.getPractices);
router.post('/testAPI', tebraController.testAPI);

module.exports = router;