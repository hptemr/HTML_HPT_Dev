const express = require('express');
const router = express.Router();
const soapController = require('../controllers/soapNoteController');

router.post('/createPlanNote', soapController.createPlanNote);
router.post('/getPlanNote', soapController.getPlanNote);
router.post('/updatePlanNote', soapController.updatePlanNote);

module.exports = router;    