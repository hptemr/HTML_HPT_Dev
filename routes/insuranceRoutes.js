const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insuranceController'); 

router.post('/addInsurance', insuranceController.addInsurance);  
router.post('/getInsuranceList', insuranceController.getInsuranceList); 
router.post('/getInsuranceDetails', insuranceController.getInsuranceDetails); 

module.exports = router;