const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');

router.post('/getReferralList', referralController.getReferralList);
router.post('/getReferralDetails', referralController.getReferralDetails);
router.post('/createAppointment', referralController.createAppointment);
router.post('/deleteAppointment', referralController.deleteAppointment);


module.exports = router;