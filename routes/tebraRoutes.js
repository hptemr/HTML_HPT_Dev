const express = require('express');
const router = express.Router();
const tebraController = require('../controllers/tebraController');

router.get('/getPatients', tebraController.createPatients);

module.exports = router;