const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/getAppointmentList', appointmentController.getAppointmentList);

module.exports = router;