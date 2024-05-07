var express = require('express')
var router = express.Router();
const authRoutes = require('./routes/authRoutes');
const commanRoutes = require('./routes/commanRoutes');
const adminRoutes = require('./routes/adminRoutes');
const patientRoutes = require('./routes/patientRoutes');
const emailTemplatesRoute = require('./routes/emailTemplateRoutes');


router.use('/auth', authRoutes);
router.use('/comman', commanRoutes);
router.use('/admin', adminRoutes);
router.use('/patients', patientRoutes);
router.use('/email', emailTemplatesRoute);

module.exports = router