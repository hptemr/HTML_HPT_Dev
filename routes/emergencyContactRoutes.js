const express = require('express');
const router = express.Router();
const emergencyContactController = require('../controllers/emergencyContactController');

router.post('/getContactData', emergencyContactController.getContactData); 
router.post('/getContactListData', emergencyContactController.getContactListData); 
router.post('/addContact', emergencyContactController.addContact); 
router.post('/deleteContact', emergencyContactController.deleteContact); 
router.post('/updateContact', emergencyContactController.updateContact); 

module.exports = router;