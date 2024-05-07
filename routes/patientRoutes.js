const express = require('express');
const router = express.Router();
var cors = require('cors')
//const Busboy = require('busboy')
const patientController = require('../controllers/patientController');
//const commonMiddleware = require('../middlewares/commonMiddleware');
var constants = require('./../config/constants')

router.post('/signup',patientController.signup);
router.post('/getPatientList',patientController.getPatientList);

router.post('/patientDocument',cors({credentials: true, origin: constants.clientUrl}),patientController.uploadPatientDocument);



module.exports = router;