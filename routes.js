var express = require('express')
var router = express.Router();
const authRoutes = require('./routes/authRoutes');
const commanRoutes = require('./routes/commanRoutes');
const adminRoutes = require('./routes/adminRoutes');

router.use('/auth', authRoutes);
router.use('/comman', commanRoutes);
router.use('/admin', adminRoutes);

module.exports = router