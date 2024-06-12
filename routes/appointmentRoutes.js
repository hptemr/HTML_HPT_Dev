const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/getAppointmentList', appointmentController.getAppointmentList);
router.post('/updatePatientCheckIn', appointmentController.updatePatientCheckIn);
router.post('/getAppointmentDetails', appointmentController.getAppointmentDetails);
router.post('/acceptAppointment', appointmentController.acceptAppointment);
router.post('/cancelAppointment', appointmentController.cancelAppointment);
router.post('/addAppointment', appointmentController.addAppointment); 
router.post('/rescheduleAppointment', appointmentController.rescheduleAppointment); 
router.post('/updateAppointment', appointmentController.updateAppointment); 

module.exports = router;