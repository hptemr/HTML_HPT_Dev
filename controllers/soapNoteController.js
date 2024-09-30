const { commonMessage, appointmentMessage, infoMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const PlanTemp = require('../models/planModel');
const BillingTemp = require('../models/billingModel');
const subjectiveTemp = require('../models/subjectiveModel');
const Appointment = require('../models/appointmentModel');
require('dotenv').config();
let ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');

const createPlanNote = async (req, res) => {
    try {
      let createParams = {
        appointmentId:new ObjectId(req.body.appointmentId),
        soap_note_type:req.body.soapNoteType,
        plan_note:req.body.planNote,
        plan_start_date:new Date(req.body.planStartDate),
        plan_end_date:new Date(req.body.planEndDate),
        createdBy: new ObjectId(req.body.endUserId),
      }
      if(req.body.soapNoteType == 'initial_examination' || req.body.soapNoteType == 'progress_note'){
        createParams.plan_note_type = req.body.planType,
        createParams.freequency_per_week = req.body.frequencyPerWeek,
        createParams.duration_per_week = req.body.durationPerWeek,
        createParams.pt_treatment_provided = req.body.ptList,
        createParams.ot_treatment_provided = req.body.otList,
        createParams.slp_treatment_provided = req.body.slpList
      } else if(req.body.soapNoteType == 'daily_note'){
        createParams.process_patient = req.body.processPatient,
        createParams.anticipat_DC = req.body.anticipatDC
      }
      await PlanTemp.create(createParams)
      commonHelper.sendResponse(res, 'success',{},'');
    } catch (error) {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const getPlanNote = async (req, res) => {
    try {
        planData = await PlanTemp.findOne({ appointmentId: req.body.appointmentId,soap_note_type: req.body.soapNoteType });
        commonHelper.sendResponse(res, 'success',planData);
    } catch (error) {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const updatePlanNote = async (req, res) => {
    try {
      let updateParams = {
        appointmentId:new ObjectId(req.body.appointmentId),
        soap_note_type:req.body.soapNoteType,
        plan_note:req.body.planNote,
        plan_start_date:new Date(req.body.planStartDate),
        plan_end_date:new Date(req.body.planEndDate),
        updatedAt: new Date(),
      }
      if(req.body.soapNoteType == 'initial_examination' || req.body.soapNoteType == 'progress_note'){
        updateParams.plan_note_type = req.body.planType,
        updateParams.freequency_per_week = req.body.frequencyPerWeek,
        updateParams.duration_per_week = req.body.durationPerWeek,
        updateParams.pt_treatment_provided = req.body.ptList,
        updateParams.ot_treatment_provided = req.body.otList,
        updateParams.slp_treatment_provided = req.body.slpList
      } else if(req.body.soapNoteType == 'daily_note'){
        updateParams.process_patient = req.body.processPatient,
        updateParams.anticipat_DC = req.body.anticipatDC
      }
      const filterPlan = { appointmentId: new ObjectId(req.body.appointmentId) };
      const updatePlan = { $set: updateParams };
      let optionsUpdatePlan = { returnOriginal: false };
      result = await PlanTemp.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
      commonHelper.sendResponse(res, 'success',{},'');
    } catch (error) {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const createBillingNote = async (req, res) => {
    try {
        let createParams = {
            appointmentId:new ObjectId(req.body.appointmentId),
            soap_note_type:req.body.soapNoteType,
            total_treatment_minutes:req.body.totalTreatmentMinutes,
            total_direct_minutes:req.body.totalDirectMinutes,
            total_units: req.body.totalUnites,
            no_visit_charges: req.body.noVisitCharge,
            united_pt_codes:req.body.unitedPtList,
            united_ot_codes:req.body.unitedOtList,
            united_slp_codes:req.body.unitedSlpList,
            direct_pt_codes:req.body.directPtList,
            direct_ot_codes:req.body.directOtList,
            direct_slp_codes:req.body.directSlpList,
            dme_cpt_codes:req.body.dmeCptList,
            additional_cpt_code:req.body.additionalCodes,
            createdBy: new ObjectId(req.body.endUserId),
        }
        await BillingTemp.create(createParams)
      commonHelper.sendResponse(res, 'success',{},'');
    } catch (error) {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const getBillingNote = async (req, res) => {
    try {
        let billingData = await BillingTemp.findOne({ appointmentId: req.body.appointmentId });
        let appointmentData = await Appointment.findOne({_id:req.body.appointmentId}, { caseType: 1,caseName:1,status:1 })
        commonHelper.sendResponse(res, 'success',billingData,appointmentData);
    } catch (error) {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const updateBillingNote = async (req, res) => {
    try {
        let updateParams = {
            appointmentId:new ObjectId(req.body.appointmentId),
            soap_note_type:req.body.soapNoteType,
            total_treatment_minutes:req.body.totalTreatmentMinutes,
            total_direct_minutes:req.body.totalDirectMinutes,
            total_units: req.body.totalUnites,
            no_visit_charges: req.body.noVisitCharge,
            united_pt_codes:req.body.unitedPtList,
            united_ot_codes:req.body.unitedOtList,
            united_slp_codes:req.body.unitedSlpList,
            direct_pt_codes:req.body.directPtList,
            direct_ot_codes:req.body.directOtList,
            direct_slp_codes:req.body.directSlpList,
            dme_cpt_codes:req.body.dmeCptList,
            additional_cpt_code:req.body.additionalCodes,
            updatedAt: new Date()
        }
        const filterPlan = { appointmentId: new ObjectId(req.body.appointmentId) };
        const updatePlan = { $set: updateParams };
        let optionsUpdatePlan = { returnOriginal: false };
        result = await BillingTemp.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
        commonHelper.sendResponse(res, 'success',{},'');
    } catch (error) {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const finalizeNote = async (req, res) => {
  try {
      let updateParams = {
          status:'Finalize',
          updatedAt: new Date()
      }
      const filterPlan = { appointmentId: new ObjectId(req.body.appointmentId) };
      const updatePlan = { $set: updateParams };
      let optionsUpdatePlan = { returnOriginal: false };
      await BillingTemp.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
      await PlanTemp.findOneAndUpdate(filterPlan, updatePlan, optionsUpdatePlan);
      commonHelper.sendResponse(res, 'success',{},'');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const submitSubjective = async (req, res) => {
  try {
    const { data,userId,subjectiveId } = req.body;
    if(subjectiveId){
      let optionsUpdatePlan = { returnOriginal: false };
      await subjectiveTemp.findOneAndUpdate({ _id: subjectiveId }, data, optionsUpdatePlan);
    }else{
      await subjectiveTemp.create(data)
    }

    commonHelper.sendResponse(res, 'success',{},'');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getSubjectiveData = async (req, res) => {
  try {
      const { query } = req.body;
      let subjectiveData = await subjectiveTemp.findOne(query);
      let appointmentData = await Appointment.findOne({_id:query.appointmentId}).populate('patientId', {firstName:1,lastName:1})
      let appointmentDatesList = await appointmentsList(appointmentData.caseName,appointmentData.patientId);
      let returnData = {subjectiveData:subjectiveData,appointmentDatesList:appointmentDatesList,appointmentData:appointmentData}
      commonHelper.sendResponse(res, 'success',returnData);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

async function appointmentsList(casename,patientId){

  let data = await Appointment.find({patientId:patientId,caseName:casename},{_id:1,appointmentDate:1}).sort({ createdAt: -1 });

  let appointmentDateList = []; 
  if(data.length>0){
    appointmentDateList = data.filter((obj) => {
          return (obj.appointmentDate);
      });
  }
  return appointmentDateList;
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
    getSubjectiveData
};