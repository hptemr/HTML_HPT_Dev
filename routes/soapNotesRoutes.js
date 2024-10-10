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
router.post('/getObjectiveData', soapController.getObjectiveData);
router.post('/submitObjective', soapController.submitObjective);
router.post('/submitObjectiveExercise', soapController.submitObjectiveExercise);
router.post('/getSubjectiveData', soapController.getSubjectiveData);
router.post('/submitAssessment', soapController.submitAssessment);
router.post('/getAssessment', soapController.getAssessment);
router.post('/getAppointmentNoteList', soapController.getAppointmentNoteList);
router.post('/deleteSoapNote', soapController.deleteSoapNote);
router.post('/createAddendum', soapController.createAddendum);

module.exports = router;    