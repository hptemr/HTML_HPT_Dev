const { commonMessage, appointmentMessage, infoMessage, soapMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const PlanTemp = require('../models/planModel');
const BillingTemp = require('../models/billingModel');
const subjectiveTemp = require('../models/subjectiveModel');
const Appointment = require('../models/appointmentModel');
const AssessmentModel = require('../models/assessmentModel');
const Case = require('../models/casesModel');
const ObjectiveModel = require('../models/objectiveModel');
require('dotenv').config();
let ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');

const createPlanNote = async (req, res) => {
  try {
    let createParams = {
      appointmentId: new ObjectId(req.body.appointmentId),
      soap_note_type: req.body.soapNoteType,
      plan_note: req.body.planNote,
      plan_start_date: new Date(req.body.planStartDate),
      plan_end_date: new Date(req.body.planEndDate),
      createdBy: new ObjectId(req.body.endUserId),
    }
    if (req.body.soapNoteType == 'initial_examination' || req.body.soapNoteType == 'progress_note') {
      createParams.plan_note_type = req.body.planType,
        createParams.freequency_per_week = req.body.frequencyPerWeek,
        createParams.duration_per_week = req.body.durationPerWeek,
        createParams.pt_treatment_provided = req.body.ptList,
        createParams.ot_treatment_provided = req.body.otList,
        createParams.slp_treatment_provided = req.body.slpList
    } else if (req.body.soapNoteType == 'daily_note') {
      createParams.process_patient = req.body.processPatient,
        createParams.anticipat_DC = req.body.anticipatDC
    }
    await PlanTemp.create(createParams)
    commonHelper.sendResponse(res, 'success', {}, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getPlanNote = async (req, res) => {
  try {
    planData = await PlanTemp.findOne({ appointmentId: req.body.appointmentId, soap_note_type: req.body.soapNoteType });
    commonHelper.sendResponse(res, 'success', planData);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const updatePlanNote = async (req, res) => {
  try {
    let updateParams = {
      appointmentId: new ObjectId(req.body.appointmentId),
      soap_note_type: req.body.soapNoteType,
      plan_note: req.body.planNote,
      plan_start_date: new Date(req.body.planStartDate),
      plan_end_date: new Date(req.body.planEndDate),
      updatedAt: new Date(),
    }
    if (req.body.soapNoteType == 'initial_examination' || req.body.soapNoteType == 'progress_note') {
      updateParams.plan_note_type = req.body.planType,
        updateParams.freequency_per_week = req.body.frequencyPerWeek,
        updateParams.duration_per_week = req.body.durationPerWeek,
        updateParams.pt_treatment_provided = req.body.ptList,
        updateParams.ot_treatment_provided = req.body.otList,
        updateParams.slp_treatment_provided = req.body.slpList
    } else if (req.body.soapNoteType == 'daily_note') {
      updateParams.process_patient = req.body.processPatient,
        updateParams.anticipat_DC = req.body.anticipatDC
    }
    const filterPlan = { appointmentId: new ObjectId(req.body.appointmentId) };
    const updatePlan = { $set: updateParams };
    let optionsUpdatePlan = { returnOriginal: false };
    result = await PlanTemp.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
    commonHelper.sendResponse(res, 'success', {}, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const createBillingNote = async (req, res) => {
  try {
    let createParams = {
      appointmentId: new ObjectId(req.body.appointmentId),
      soap_note_type: req.body.soapNoteType,
      total_treatment_minutes: req.body.totalTreatmentMinutes,
      total_direct_minutes: req.body.totalDirectMinutes,
      total_units: req.body.totalUnites,
      no_visit_charges: req.body.noVisitCharge,
      united_pt_codes: req.body.unitedPtList,
      united_ot_codes: req.body.unitedOtList,
      united_slp_codes: req.body.unitedSlpList,
      direct_pt_codes: req.body.directPtList,
      direct_ot_codes: req.body.directOtList,
      direct_slp_codes: req.body.directSlpList,
      dme_cpt_codes: req.body.dmeCptList,
      additional_cpt_code: req.body.additionalCodes,
      createdBy: new ObjectId(req.body.endUserId),
    }
    await BillingTemp.create(createParams)
    commonHelper.sendResponse(res, 'success', {}, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getBillingNote = async (req, res) => {
  try {
    let billingData = await BillingTemp.findOne({ appointmentId: req.body.appointmentId, soap_note_type: req.body.noteType });
    // let appointmentData = await Appointment.findOne({ _id: req.body.appointmentId }, { caseType: 1, caseName: 1, status: 1 })
    let caseData = await Case.findOne({ appointments: { $in: [new ObjectId(req.body.appointmentId)] } }, { caseType: 1, billingType: 1, caseName: 1 })
    commonHelper.sendResponse(res, 'success', billingData, caseData);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const updateBillingNote = async (req, res) => {
  try {
    let updateParams = {
      appointmentId: new ObjectId(req.body.appointmentId),
      soap_note_type: req.body.soapNoteType,
      total_treatment_minutes: req.body.totalTreatmentMinutes,
      total_direct_minutes: req.body.totalDirectMinutes,
      total_units: req.body.totalUnites,
      no_visit_charges: req.body.noVisitCharge,
      united_pt_codes: req.body.unitedPtList,
      united_ot_codes: req.body.unitedOtList,
      united_slp_codes: req.body.unitedSlpList,
      direct_pt_codes: req.body.directPtList,
      direct_ot_codes: req.body.directOtList,
      direct_slp_codes: req.body.directSlpList,
      dme_cpt_codes: req.body.dmeCptList,
      additional_cpt_code: req.body.additionalCodes,
      updatedAt: new Date()
    }
    const filterPlan = { appointmentId: new ObjectId(req.body.appointmentId) };
    const updatePlan = { $set: updateParams };
    let optionsUpdatePlan = { returnOriginal: false };
    result = await BillingTemp.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
    commonHelper.sendResponse(res, 'success', {}, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const finalizeNote = async (req, res) => {
  try {
    let updateParams = {
      status: 'Finalize',
      updatedAt: new Date()
    }
    const filterPlan = { appointmentId: new ObjectId(req.body.appointmentId) };
    const updatePlan = { $set: updateParams };
    let optionsUpdatePlan = { returnOriginal: false };
    await BillingTemp.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
    await PlanTemp.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
    commonHelper.sendResponse(res, 'success', {}, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const submitSubjective = async (req, res) => {
  try {
    const { data, subjectiveId } = req.body;
    if (subjectiveId) {
      let optionsUpdatePlan = { returnOriginal: false };
      await subjectiveTemp.findOneAndUpdate({ _id: subjectiveId }, data, optionsUpdatePlan);
    } else {
      await subjectiveTemp.create(data)
      if (data.soap_note_type && data.soap_note_type != 'daily_note') {
        await setAssessment(req)
      }
    }
    commonHelper.sendResponse(res, 'success', {}, soapMessage.subjective);
  } catch (error) {
    console.log("*****************error", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getObjectiveData = async (req, res) => {
  try {
    const { query } = req.body;
    let objectiveData = await ObjectiveModel.findOne(query);
    let subjectiveData = await subjectiveTemp.findOne(query);
    let appointmentData = await Appointment.findOne({ _id: query.appointmentId }).populate('patientId', { firstName: 1, lastName: 1 })
    let appointmentDatesList = await appointmentsList(appointmentData.caseName, appointmentData.patientId);

    let returnData = { objectiveData: objectiveData, subjectiveData: subjectiveData, appointmentDatesList: appointmentDatesList, appointmentData: appointmentData }
    commonHelper.sendResponse(res, 'success', returnData);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const submitObjective = async (req, res) => {
  try {
    const { data, query, userId, type } = req.body;

    let objective_data = await ObjectiveModel.findOne(query);

    let message = '';
    if (objective_data) {
      await ObjectiveModel.findOneAndUpdate(query, data);
      message = soapMessage.updateObjective;
    } else {
      await ObjectiveModel.create(data)
      message = soapMessage.addObjective;
    }
    commonHelper.sendResponse(res, 'success', {}, message);
  } catch (error) {
    console.log(' ***************** ', error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const submitObjectiveExercise = async (req, res) => {
  try {
    const { data, query, exerciseType, userId, type } = req.body;
    let objective_exercise_data = await ObjectiveModel.findOne(query);

    let message = '';
    if (objective_exercise_data) {
      if (exerciseType == 'Land Flowsheet') {
        objective_exercise_data.land_exercise.push(data);
      } else if (exerciseType == 'Aquatic Flowsheet') {
        objective_exercise_data.aquatic_exercise.push(data);
      }
      await ObjectiveModel.findOneAndUpdate(query, objective_exercise_data);
      message = soapMessage.upadteExercise;
    } else {
      let insert_data = {
        appointmentId: query.appointmentId,
        soap_note_type: data.soap_note_type,
        createdBy: data.createdBy,
      }

      if (exerciseType == 'Land Flowsheet') {
        Object.assign(insert_data, { land_exercise: data })
      } else if (exerciseType == 'Aquatic Flowsheet') {
        Object.assign(insert_data, { aquatic_exercise: data })
      }

      //console.log(' ***************** ',insert_data)
      await ObjectiveModel.create(insert_data)
      message = soapMessage.addExercise;
    }
    commonHelper.sendResponse(res, 'success', {}, message);
  } catch (error) {
    console.log(' ***************** ', error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getSubjectiveData = async (req, res) => {
  try {
    const { query } = req.body;
    let subjectiveData = await subjectiveTemp.findOne(query);
    let appointmentData = await Appointment.findOne({ _id: query.appointmentId }).populate('patientId', { firstName: 1, lastName: 1 })
    let appointmentDatesList = await appointmentsList(appointmentData.caseName, appointmentData.patientId);
    let returnData = { subjectiveData: subjectiveData, appointmentDatesList: appointmentDatesList, appointmentData: appointmentData }
    commonHelper.sendResponse(res, 'success', returnData);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

async function appointmentsList(casename, patientId) {
  let data = await Appointment.find({ patientId: patientId, caseName: casename }, { _id: 1, appointmentDate: 1 }).sort({ createdAt: -1 });
  let appointmentDateList = [];
  if (data.length > 0) {
    appointmentDateList = data.filter((obj) => {
      return (obj.appointmentDate);
    });
  }
  return appointmentDateList;
}

//Add/Update the Assessment data for initial exam
const submitAssessment = async (req, res) => {
  try {
    const { data, query, isUpdate } = req.body;
    if (isUpdate) {
      let optionsUpdatePlan = { returnOriginal: false };
      await AssessmentModel.findOneAndUpdate(query, data, optionsUpdatePlan);
    } else {
      await AssessmentModel.create(data)
    }
    commonHelper.sendResponse(res, 'success', {}, soapMessage.assessment);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

//get Assessment data for initial exam
const getAssessment = async (req, res) => {
  try {
    const { query, fields } = req.body;
    let assessmentData = await AssessmentModel.findOne(query, fields);
    commonHelper.sendResponse(res, 'success', assessmentData, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

async function setAssessment(req) {
  const { data } = req.body;
  let assessmentData = await AssessmentModel.findOne({ appointmentId: data.appointmentId, soap_note_type: data.soap_note_type });
  if (!assessmentData && data.diagnosis_code && data.diagnosis_code.length > 0) {
    let appointmentData = await Appointment.findOne({ _id: data.appointmentId }, { patientId: 1, appointmentDate: 1 }).populate('patientId', { firstName: 1, lastName: 1 })
    let assessment_icd = []
    let patientName = appointmentData.patientId.firstName + " " + appointmentData.patientId.lastName
    let todayDate = new Date(appointmentData.appointmentDate).toLocaleString('en-US', {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    data.diagnosis_code.forEach(element => {
      assessment_icd.push({
        problem: element.name + " limiting function",
        long_term_goal: "Improve " + element.name + " to restore function"
      })
    });

    let assessmentInsert = {
      soap_note_type: data.soap_note_type,
      appointmentId: data.appointmentId,
      assessment_icd: assessment_icd,
      assessment_text: "Thank you for referring " + patientName + " to our practice, " + patientName + " received  an initial evaluation and treatment today " + todayDate + ". As per your referral, we will see " + patientName + " ___ times per week for ___ weeks with a focus on *first 3 treatments to be added*. I will update you on " + patientName + " progress as appropriate, thank you for the opportunity to assist with their rehabilitation.",
      supporting_documentation_text: "1. Neuromuscular Re-education completed to assist with reactive and postural responses, and improving anticipatory responses for dynamic activities. =Neuromuscular Re-Education, 97112 \n 2.Therapeutic Activity completed for improving functional transitioning performance to assist in performance of ADL's= Therapeutic Activity, 97530 \n 3. Patient is unable to complete physical therapy on land. = Aquatic Exercise, 97113 \n 4. Vasopneumatic device required to assist with reduction in effusion in combination with cryotherapy to improve functional performance through reduced effusion and improved range of motion and motor facilitation and / or used as contrast or thermotherapy to improve circulation, modulate pain, and improve functional range of motion = Vasopneumatic Device 97016 \n 5. If any item from the DME section is selected then the following data is shown in the Supporting Documentation Page with a space between any content present above, if it is present.Text to be added: DME was issued today with instructions on wear, care, and use required for full rehabilitation potential",
    }
    await AssessmentModel.create(assessmentInsert)
  }
}

module.exports = {
  createPlanNote,
  getPlanNote,
  updatePlanNote,
  createBillingNote,
  getBillingNote,
  updateBillingNote,
  finalizeNote,
  submitSubjective,
  getObjectiveData,
  submitObjective,
  submitObjectiveExercise,
  getSubjectiveData,
  submitAssessment,
  getAssessment,
};