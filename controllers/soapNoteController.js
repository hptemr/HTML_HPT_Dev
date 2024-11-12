const { commonMessage, appointmentMessage, infoMessage, soapMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const PlanTemp = require('../models/planModel');
const BillingTemp = require('../models/billingModel');
const subjectiveTemp = require('../models/subjectiveModel');
const Appointment = require('../models/appointmentModel');
const AssessmentModel = require('../models/assessmentModel');
const Case = require('../models/casesModel');
const caseNotes = require('../models/caseNotesModel');
const ObjectiveModel = require('../models/objectiveModel');
const faxTemp = require('../models/faxDetailsModel');
const sendEmailServices = require('../helpers/sendEmail');
var constants = require('./../config/constants')
const moment = require('moment');
require('dotenv').config();
let ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const htmlPdf = require('html-pdf-node');
const apiKey = constants.faxDetails.apiKey;
const apiSecret = constants.faxDetails.apiSecret;

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
      createParams.process_patient = req.body.processPatient?req.body.processPatient:false,
      createParams.anticipat_DC = req.body.anticipatDC?req.body.anticipatDC:false
    }
    await PlanTemp.create(createParams)
    if(req.body.soapNoteType == 'initial_examination'){
      createParams.soap_note_type = 'progress_note'
      await setPlan(createParams)
    }
    commonHelper.sendResponse(res, 'success', {}, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

async function setPlan(req) {
  let planData = await PlanTemp.findOne({ appointmentId: req.appointmentId, soap_note_type: req.soap_note_type });
  console.log(planData)
  if (!planData) {
    await PlanTemp.create(req)
  }
}

const getPlanNote = async (req, res) => {
  try {
    let planData = await PlanTemp.findOne({ appointmentId: req.body.appointmentId, soap_note_type: req.body.soapNoteType });
    if(!planData){
      let caseData = await Case.findOne({ appointments: { $in: [new ObjectId(req.body.appointmentId)] } }, { caseType: 1, appointments: 1, caseName: 1 })
      if(caseData){
        let recentAppointmentId = caseData.appointments[caseData.appointments.length-2]
        if(recentAppointmentId!=undefined){
          planData = await PlanTemp.findOne({ appointmentId: recentAppointmentId, soap_note_type: req.body.soapNoteType });
        }
      }
    }
    let caseData = await Case.findOne({ appointments: { $in: [new ObjectId(req.body.appointmentId)] } }, { caseType: 1, billingType: 1, caseName: 1 })
    commonHelper.sendResponse(res, 'success', planData,caseData);
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
    subjectiveResult = await subjectiveTemp.findOne({appointmentId: new ObjectId(req.body.appointmentId)});
    if(subjectiveResult){
      ObjectiveResult = await ObjectiveModel.findOne({appointmentId: new ObjectId(req.body.appointmentId)});
      if(ObjectiveResult){
        AssessmentResult = await AssessmentModel.findOne({appointmentId: new ObjectId(req.body.appointmentId)});
        if(AssessmentResult){
          planResult = await PlanTemp.findOne({appointmentId: new ObjectId(req.body.appointmentId)});
          if(planResult){
            let updateParams = {
              status: 'Finalized',
              updatedAt: new Date()
            }
            const filterPlan = { appointmentId: new ObjectId(req.body.appointmentId) };
            const updatePlan = { $set: updateParams };
            let optionsUpdatePlan = { returnOriginal: false };
            await BillingTemp.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
            await PlanTemp.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
            await subjectiveTemp.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
            await ObjectiveModel.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
            await AssessmentModel.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
            commonHelper.sendResponse(res, 'success', {}, '');
          }else{
            commonHelper.sendResponse(res, 'success', null, "Please fill the Plan note to Finalize note");
          }
        }else{
          commonHelper.sendResponse(res, 'success', null, "Please fill the Assessment note to Finalize note");
        }
      }else{
        commonHelper.sendResponse(res, 'success', null, "Please fill the Objective note to Finalize note");
      }
    }else{
      commonHelper.sendResponse(res, 'success', null, "Please fill the Subjective note to Finalize note");
    }
  } catch (error) {
    commonHelper.sendResponse(res, 'success', null, commonMessage.wentWrong);
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

async function getPreviousObjectiveData(queryMatch) {
  return new Promise(async (resolve, reject) => {
    try {
       let objectiveData = await ObjectiveModel.aggregate([
        {
          "$lookup": {
            from: "appointments",
            localField: "appointmentId",
            foreignField: "_id",
            as: "appointment"
          }
        },          
        {
          $match: queryMatch
        },
        {
          $project: {
            '__v': 0
          }
        }]).sort({ _id: -1 }).skip(0).limit(1);

        resolve(objectiveData);       

    } catch (error) {
      console.log('error>>>',error)
      reject(true)
    }
  })
}

const getObjectiveData = async (req, res) => {
  try {
    const { query } = req.body;
    let appointmentData = await Appointment.findOne({ _id: query.appointmentId }).populate('patientId', { firstName: 1, lastName: 1,patientId:1 })

    let objectiveData = await ObjectiveModel.findOne(query);
    if(!objectiveData && appointmentData){
      let app_query = {'appointment.patientId':appointmentData.patientId._id,'appointment.caseName':appointmentData.caseName,soap_note_type:query.soap_note_type,'appointmentId': { '$exists': true }}
      const getObjData = await getPreviousObjectiveData(app_query);
      if(getObjData && getObjData[0]){objectiveData = getObjData[0];
        if(objectiveData && (objectiveData.status=='Finalized' || objectiveData.status=='Finalize')){
          objectiveData.status='Draft';
        }      
      }
    }
    let subjectiveData = await subjectiveTemp.findOne(query);
    if(!subjectiveData && appointmentData){      
      let app_subjective_query = {'appointment.patientId':appointmentData.patientId._id,'appointment.caseName':appointmentData.caseName,soap_note_type:query.soap_note_type,'appointmentId': { '$exists': true }}
      const getData = await getPreviousSubjectiveData(app_subjective_query,query.soap_note_type);
      if(getData && getData[0]){subjectiveData = getData[0];
        if(subjectiveData.status=='Finalized' || objectiveData.status=='Finalize'){
          subjectiveData.status='Draft';
        }      
      }
    }
    let appointmentDatesList = [];
    if(appointmentData){      
     appointmentDatesList = await appointmentsList(appointmentData.caseName, appointmentData.patientId);
    }
    let returnData = { objectiveData: objectiveData, subjectiveData: subjectiveData, appointmentDatesList: appointmentDatesList, appointmentData: appointmentData }
    commonHelper.sendResponse(res, 'success', returnData);
  } catch (error) {
    console.log('objectiveData >>> ',error)
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

async function getPreviousSubjectiveData(queryMatch) {
  return new Promise(async (resolve, reject) => {
    try {
      //const pre_app_data = await Appointment.find(app_query).sort({ _id: -1 });//.skip(1).limit(1);  
      let subjectiveData = await subjectiveTemp.aggregate([
        {
          "$lookup": {
            from: "appointments",
            localField: "appointmentId",
            foreignField: "_id",
            as: "appointment"
          }
        },          
        {
          $match: queryMatch
        },
        {
          $project: {
            '__v': 0
          }
        }]).sort({ _id: -1 }).skip(0).limit(1);

        resolve(subjectiveData);       
    } catch (error) {
      console.log('error>>>',error)
      reject(true)
    }
  })
}

const getSubjectiveData = async (req, res) => {
  try {
    const { query } = req.body;
    let appointmentData = await Appointment.findOne({ _id: query.appointmentId }).populate('patientId', { firstName: 1, lastName: 1 })
    let subjectiveData = await subjectiveTemp.findOne(query);
    if(!subjectiveData && appointmentData){
      let app_query = {'appointment.patientId':appointmentData.patientId._id,'appointment.caseName':appointmentData.caseName,soap_note_type:query.soap_note_type,'appointmentId': { '$exists': true }}
      const getData = await getPreviousSubjectiveData(app_query);
      if(getData && getData[0]){subjectiveData = getData[0];
          if(subjectiveData.status=='Finalized' || subjectiveData.status=='Finalize'){
            subjectiveData.status='Draft';
          }      
      }
    }
    let appointmentDatesList = [];
    if(appointmentData){      
      appointmentDatesList = await appointmentsList(appointmentData.caseName, appointmentData.patientId);
    }
    let returnData = { subjectiveData: subjectiveData, appointmentDatesList: appointmentDatesList, appointmentData: appointmentData }
    commonHelper.sendResponse(res, 'success', returnData);
  } catch (error) {
    console.log('get subjective data error >>>>',error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

async function appointmentsList(casename, patientId) {
  let data = await Appointment.find({ patientId: patientId, caseName: casename }, { _id: 1, appointmentDate: 1 }).sort({ createdAt: -1 });
  let appointmentDateList = [];
  if (data.length > 0) {
    appointmentDateList = data.filter((obj) => {
      return moment(obj.appointmentDate).utc().format();
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

const getAppointmentNoteList = async (req, res) => {
  try {
    let query = {appointmentId: new ObjectId(req.body.appointmentId)}
    if(req.body.searchValue!=""){
      query.soap_note_type = { '$regex': req.body.searchValue, '$options': "i" }
    }
    if(req.body.status){
      query.status = req.body.status
    }
    if(req.body.caseType){
      query.soap_note_type = req.body.caseType
    }
    if (req.body.fromDate && req.body.toDate) {
        query.createdAt = {
            $gte: new Date(req.body.fromDate),
            $lte: new Date(req.body.toDate)
        }
    } else {
        if (req.body.fromDate) {
            query.createdAt = { $gte: new Date(req.body.fromDate) }
        }
        if (req.body.toDate) {
            query.createdAt = { $lte: new Date(req.body.toDate) }
        }
    }
    let aggrQuery = [
     {
          "$lookup": {
              from: "users",
              localField: "createdBy",
              foreignField: "_id",
              as: "userObj"
          }
      },
      {
          "$match": query
      },
      {
          $project: {
              '_id': 1, 'note_date': 1,'appointmentId':1, 'soap_note_type': 1, 'status': 1, 'createdBy': 1, 'createdAt': 1, 'updatedAt': 1, 'userObj._id': 1, 'userObj.firstName': 1, 'userObj.lastName': 1
          }
      },
      { "$sort": { "createdAt": -1 } }
  ]
  let subjectiveData = await subjectiveTemp.aggregate(aggrQuery)
    commonHelper.sendResponse(res, 'success', subjectiveData);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const deleteSoapNote = async (req, res) => {
  try {
    const filterPlan = { appointmentId: new ObjectId(req.body.appointmentId),soap_note_type:req.body.noteType };
    const updatePlan = { $set: { is_deleted: true } };
    let optionsUpdatePlan = { returnOriginal: false };
    subjectiveTemp.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
    commonHelper.sendResponse(res, 'success', 'Deleted successfully');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const createAddendum = async (req, res) => {
  try {
    const filterPlan = { appointmentId: new ObjectId(req.body.appointmentId),soap_note_type:req.body.noteType };
    const updatePlan = { $set: { is_deleted: true } };
    let optionsUpdatePlan = { returnOriginal: false };
    result = await subjectiveTemp.findOne(filterPlan, updatePlan, optionsUpdatePlan);
    commonHelper.sendResponse(res, 'success', 'Deleted successfully');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getInitialExamination = async (req, res) => {
  try {
    const { query, fields } = req.body;
    let initialExaminationData = await PlanTemp.findOne(query, fields);
    commonHelper.sendResponse(res, 'success', initialExaminationData, 'Success');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


const getCaseNoteData = async (req, res) => {
  try {
    const { query } = req.body;
    let appointmentData = await Appointment.findOne({ _id: query.appointmentId }).populate('patientId', { firstName: 1, lastName: 1 })  
    let caseNoteData = await caseNotes.findOne(query);
  
    let appointmentDatesList = [];
    if(appointmentData){      
      appointmentDatesList = await appointmentsList(appointmentData.caseName,appointmentData.patientId);
    }
  
    let returnData = { caseNoteData: caseNoteData, appointmentDatesList: appointmentDatesList, appointmentData: appointmentData }
    commonHelper.sendResponse(res, 'success', returnData);
  } catch (error) {
    console.log('get case notes data error >>>>',error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const submitCaseNote = async (req, res) => {
  try {
    const { data, caseNoteId } = req.body;
    let message = '';
    if (caseNoteId) {
      let optionsUpdatePlan = { returnOriginal: false };
      await caseNotes.findOneAndUpdate({ _id: caseNoteId }, data, optionsUpdatePlan);
      message = soapMessage.caseNoteUpdated;
    } else {
      await caseNotes.create(data)
      message = soapMessage.caseNoteCreate;
    }
    commonHelper.sendResponse(res, 'success', {}, message);
  } catch (error) {
    console.log("*****************error", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getOnePageNoteDetails = async (req, res) => {
  try {
    let planData = await PlanTemp.findOne({ appointmentId: req.body.appointmentId })
    let subjectiveData = await subjectiveTemp.findOne({ appointmentId: req.body.appointmentId },{ updatedAt: 1, diagnosis_code: 1,note_date:1,subjective_note:1})
    let assessmentData = await AssessmentModel.findOne({ appointmentId: req.body.appointmentId },{ assessment_icd: 1,assessment_text:1 })
    let objectiveData = await ObjectiveModel.findOne({ appointmentId: req.body.appointmentId },{ observation: 1,range_of_motion:1,strength:1,neurological:1 })
    let returnData = { planData: planData,subjectiveData:subjectiveData,assessmentData:assessmentData,objectiveData:objectiveData }
    commonHelper.sendResponse(res, 'success', returnData);
  } catch (error) {
    console.log(error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

async function createTmpFax(recipientFaxNumber,senderFaxNumber) {
  console.log("createTmpFax function")
  const tmpFaxData = {
    "toName": "HPT EHR",
    "fromName": "HPT EHR",
    "subject": "",
    "message": "",
    "companyInfo": "",
    "fromNumber": 14062730993,
    "recipients": recipientFaxNumber,
    "resolution": "Fine",
    "pageSize": "Letter",
    "includeCoversheet": false,
    "uuid": "ABC-123"
  }
  const response = await axios.post('https://api.humblefax.com/tmpFax',tmpFaxData,
    { auth: { username: apiKey, password: apiSecret } }
  );
  return response.data.data.tmpFax.id; // Get the temporary fax ID
}

// Step 2: Upload attachment
async function uploadAttachment(tmpFaxId,filePath) {
  console.log("uploadAttachment function")
  const form = new FormData();
  form.append('attachment', fs.createReadStream(filePath));
  await axios.post(`https://api.humblefax.com/attachment/${tmpFaxId}`,
    form,
    {
      headers: { ...form.getHeaders() },
      auth: { username: apiKey, password: apiSecret },
    }
  );
  fs.unlink(filePath, (err) => { })
}

// Step 3: Send the fax
async function sendFaxData(tmpFaxId,dateOfService,appointmentId,noteName) {
  try {
    console.log("sendFaxData")
    await axios.post(`https://api.humblefax.com/tmpFax/${tmpFaxId}/send`,{},{ auth: { username: apiKey, password: apiSecret } }).then(async response => {
      let status = ""
      if(response.data.result == 'success'){
        status = "success"
      }else{
        status = "failed"
      }
      let createParams = {
        appointmentId: new ObjectId(appointmentId),
        dateOfService: dateOfService,
        noteType: noteName,
        status: status
      }
      await faxTemp.create(createParams)
    });
  } catch (error) {
    let createParams = {
      appointmentId: new ObjectId(appointmentId),
      dateOfService: dateOfService,
      noteType: noteName,
      status: 'failed'
    }
    await faxTemp.create(createParams)
  } 
}

const sendFax = async (req, res) => {
  try {
    const senderFaxNumber = '14062730993';
    let templateName = ""
    let noteName = ""
    if(req.body.noteType == 'initial_examination'){
      templateName = "initialExaminationOnePageNote"
      noteName = "Initial Examination"
    }else if(req.body.noteType == 'progress_note'){
      templateName = "progressNoteOnePageNote"
      noteName = "Progress Note"
    }else if(req.body.noteType == 'discharge_note'){
      templateName = "dischargeNoteOnePageNote"
      noteName = "Discharge Note"
    }
    let template = await sendEmailServices.getEmailTemplateByCode(templateName);
      if (template) {
          let params = {
            "{noteType}": noteName,
            "{patientName}": req.body.patientName,
            "{appointmentDate}": moment(req.body.subjectiveData.note_date).utc().format('MMM d, y hh:mm a'),
            "{freequency_per_week}": req.body.noteData.freequency_per_week,
            "{duration_per_week}": req.body.noteData.duration_per_week,
            "{treatmentToBeProvided}": req.body.treatmentToBeProvided,
            "{patientDob}": moment(req.body.appointmentData.patientId.dob).utc().format('MM/DD/yyyy'),
            "{referDoctor}": req.body.appointmentData.doctorId.name,
            "{dateOfFinalized}": moment(req.body.subjectiveData.updatedAt).utc().format('MM/DD/yyyy'),
            "{dignosis}": "",
            "{longTermGoal}": "",
            "{plan_start_date}": moment(req.body.noteData.plan_start_date).utc().format('MM/DD/yyyy'),
            "{plan_end_date}": moment(req.body.noteData.plan_end_date).utc().format('MM/DD/yyyy'),
            "{numberOfVisits}": req.body.visits,
            "{treatments}": req.body.treatmentToBeProvided,
            "{subjectiveContent}": req.body.subjectiveData.subjective_note,
            "{observation}": req.body.objectiveData.observation,
            "{rom}": req.body.objectiveData.range_of_motion,
            "{strength}": req.body.objectiveData.strength,
            "{neurological}": req.body.objectiveData.neurological,
            "{assessmentNote}": req.body.assessmentData.assessment_text,
            "{planNote}": req.body.noteData.plan_note,
          }
          if(req.body.subjectiveData.diagnosis_code.length>0){
            params['{dignosis}'] = req.body.subjectiveData.diagnosis_code[0].code +":"+req.body.subjectiveData.diagnosis_code[0].name
          }

          if(req.body.assessmentData.assessment_icd.length>0){
            params['{longTermGoal}'] = req.body.assessmentData.assessment_icd[0].long_term_goal
          }
        const options = { format: 'A3' };
        const file = { content: sendEmailServices.generateContentFromTemplate(template.mail_body, params) };
        const pdfBuffer = await htmlPdf.generatePdf(file, options);
        let fileName = req.body.patientName+"_"+moment(req.body.subjectiveData.note_date).utc().format('DDMMYYYY')+".pdf"
        fs.writeFileSync(__dirname + '/../tmp/'+fileName, pdfBuffer);
        const tmpFaxId = await createTmpFax(req.body.faxNumbers,senderFaxNumber);
        const filePath = __dirname + '/../tmp/'+fileName;
        await uploadAttachment(tmpFaxId,filePath);
        await sendFaxData(tmpFaxId,req.body.subjectiveData.note_date,req.body.appointmentId,noteName);
        commonHelper.sendResponse(res, 'success', {});
      }else{
        commonHelper.sendResponse(res, 'success', {});
      }
  } catch (error) {
    console.log(error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getFaxHistory = async (req, res) => {
  try {
    let faxData = await faxTemp.find({appointmentId:req.body.appointmentId}).sort({ _id: -1 }).limit(10)
    commonHelper.sendResponse(res, 'success', faxData);
  } catch (error) {
    console.log(error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
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
  getAppointmentNoteList,
  submitCaseNote,
  getCaseNoteData,
  deleteSoapNote,
  createAddendum,
  getInitialExamination,
  sendFax,
  getOnePageNoteDetails,
  getFaxHistory
};