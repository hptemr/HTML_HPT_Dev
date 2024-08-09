const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/getAppointmentList', appointmentController.getAppointmentList);
router.post('/updatePatientCheckIn', appointmentController.updatePatientCheckIn);
router.post('/getAppointmentDetails', appointmentController.getAppointmentDetails);
router.post('/acceptAppointment', appointmentController.acceptAppointment);
router.post('/cancelAppointment', appointmentController.cancelAppointment);
router.post('/addAppointment', appointmentController.addAppointment); 
router.post('/createAppointmentRequest', appointmentController.createAppointmentRequest); 
router.post('/rescheduleAppointment', appointmentController.rescheduleAppointment); 
router.post('/updateAppointment', appointmentController.updateAppointment); 
router.post('/download', appointmentController.download); 

module.exports = router;