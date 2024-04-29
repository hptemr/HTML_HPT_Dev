var express = require('express')
var router = express.Router();
const systemAdminRoutes = require('./routes/systemAdminRoutes');
const authRoutes = require('./routes/authRoutes');
const practiceAdminRoutes = require('./routes/practiceAdminRoutes');
const commanRoutes = require('./routes/commanRoutes');
const adminCommonRoutes = require('./routes/adminCommonRoutes');
const patientRoutes = require('./routes/patientRoutes');


router.use('/auth', authRoutes);
router.use('/systemAdmin', systemAdminRoutes);
router.use('/practiceAdmin', practiceAdminRoutes);
router.use('/comman', commanRoutes);
router.use('/adminCommon', adminCommonRoutes);
router.use('/patients', patientRoutes);

module.exports = router