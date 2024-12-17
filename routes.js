var express = require('express')
var router = express.Router();
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const patientRoutes = require('./routes/patientRoutes');
const emailTemplatesRoute = require('./routes/emailTemplateRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const insuranceRoutes = require('./routes/insuranceRoutes');
const emergencyContactRoutes = require('./routes/emergencyContactRoutes');
const referralRoutes = require('./routes/referralRoutes');
const soapRoutes = require('./routes/soapNotesRoutes');
const tebraRoutes = require('./routes/tebraRoutes');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/patients', patientRoutes);
router.use('/email', emailTemplatesRoute);
router.use('/insurance', insuranceRoutes);
router.use('/appointment', appointmentRoutes);
router.use('/emergencyContact', emergencyContactRoutes);
router.use('/referral', referralRoutes);
router.use('/soapNote', soapRoutes);
router.use('/tebra', tebraRoutes);

module.exports = router