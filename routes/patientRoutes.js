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
router.post('/getPreviewDocument',patientController.previewDocument);
router.post('/deleteDocument',patientController.deleteDocument);
router.post('/getPatientData',patientController.getPatientData);
router.post('/updateProfile',patientController.updateProfile);
router.post('/changeProfileImage', patientController.changeProfileImage);
router.post('/deleteProfileImage', patientController.deleteProfileImage);
router.post('/changePassword', patientController.changePassword);
router.post('/searchPatientList',patientController.searchPatientList);
router.post('/getPatientSignupToken',patientController.getPatientSignupToken);
module.exports = router;