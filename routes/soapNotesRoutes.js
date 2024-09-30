const express = require('express');
const router = express.Router();
const soapController = require('../controllers/soapNoteController');

//plan tab
router.post('/createPlanNote', soapController.createPlanNote);
router.post('/getPlanNote', soapController.getPlanNote);
router.post('/updatePlanNote', soapController.updatePlanNote);

//billing tab
router.post('/createBillingNote', soapController.createBillingNote);
router.post('/getBillingNote', soapController.getBillingNote);
router.post('/updateBillingNote', soapController.updateBillingNote);
router.post('/finalizeNote', soapController.finalizeNote);
router.post('/submitSubjective', soapController.submitSubjective);
router.post('/getSubjectiveData', soapController.getSubjectiveData);
module.exports = router;    