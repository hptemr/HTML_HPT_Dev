var express = require('express')
var router = express.Router();
const systemAdminRoutes = require('./routes/systemAdminRoutes');
const authRoutes = require('./routes/authRoutes');
const practiceAdminRoutes = require('./routes/practiceAdminRoutes');
const commanRoutes = require('./routes/commanRoutes');
const adminCommonRoutes = require('./routes/adminCommonRoutes');

router.use('/auth', authRoutes);
router.use('/systemAdmin', systemAdminRoutes);
router.use('/practiceAdmin', practiceAdminRoutes);
router.use('/comman', commanRoutes);
router.use('/adminCommon', adminCommonRoutes);

module.exports = router