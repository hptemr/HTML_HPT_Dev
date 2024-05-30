const express = require('express');
const router = express.Router();
const emergencyContactController = require('../controllers/emergencyContactController');

router.post('/getContactData', emergencyContactController.getContactData); 
router.post('/addUpdateContactData', emergencyContactController.addUpdateEmergencyContact); 

module.exports = router;