const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');

router.post('/getReferralList', referralController.getReferralList);
router.post('/getReferralDetails', referralController.getReferralDetails);
router.post('/createAppointment', referralController.createAppointment);
router.post('/deleteAppointment', referralController.deleteAppointment);
router.post('/getPatientThroughSignUpToken', referralController.getPatientThroughSignUpToken);
router.post('/getAppointmentDataById', referralController.getAppointmentDataById);
router.post('/updateAppointment', referralController.updateAppointment);

module.exports = router;