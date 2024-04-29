const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
//const commonMiddleware = require('../middlewares/commonMiddleware');

router.post('/signup',patientController.signup);
router.post('/getPatientList',patientController.getPatientList);

module.exports = router;