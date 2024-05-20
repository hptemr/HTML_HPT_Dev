var express = require('express')
var router = express.Router();
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const patientRoutes = require('./routes/patientRoutes');
const emailTemplatesRoute = require('./routes/emailTemplateRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/patients', patientRoutes);
router.use('/email', emailTemplatesRoute);
router.use('/appointment', appointmentRoutes);

module.exports = router