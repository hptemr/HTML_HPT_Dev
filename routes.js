var express = require('express')
var router = express.Router();
const systemAdminRoutes = require('./routes/systemAdminRoutes');
const authRoutes = require('./routes/authRoutes');
const practiceAdminRoutes = require('./routes/practiceAdminRoutes');
const commanRoutes = require('./routes/commanRoutes');

router.use('/auth', authRoutes);
router.use('/systemAdmin', systemAdminRoutes);
router.use('/practiceAdmin', practiceAdminRoutes);
router.use('/comman', commanRoutes);

module.exports = router