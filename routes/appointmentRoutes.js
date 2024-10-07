const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/getAppointmentList', appointmentController.getAppointmentList);
router.post('/updatePatientCheckIn', appointmentController.updatePatientCheckIn);
router.post('/getAppointmentDetails', appointmentController.getAppointmentDetails);
router.post('/acceptAppointment', appointmentController.acceptAppointment);
router.post('/cancelAppointment', appointmentController.cancelAppointment);
router.post('/addAppointment', appointmentController.addAppointment); 
router.post('/rescheduleAppointment', appointmentController.rescheduleAppointment); 
router.post('/updateAppointment', appointmentController.updateAppointment); 
router.post('/download', appointmentController.download); 
router.post('/createAppointmentRequest', appointmentController.createAppointmentRequest);
router.post('/getAppointmentRequestList', appointmentController.getAppointmentRequestList); 
router.post('/getAppointmentRequestDetails', appointmentController.getAppointmentRequestDetails); 
router.post('/createAppointment', appointmentController.createAppointment);
router.post('/resolvedRequest', appointmentController.resolvedRequest);
router.post('/getPatientCaseList', appointmentController.getPatientCaseList);
router.post('/getDoctorList', appointmentController.getDoctorList);
router.post('/getCaseList', appointmentController.getCaseList);
router.post('/addBillingDetails', appointmentController.addBillingDetails);
router.post('/getBillingDetails', appointmentController.getBillingDetails);
router.post('/addAuthorizationManagement', appointmentController.addAuthorizationManagement);
router.post('/getAuthorizationManagementDetails', appointmentController.getAuthorizationManagementDetails);

module.exports = router;