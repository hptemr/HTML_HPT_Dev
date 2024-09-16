const { commonMessage, appointmentMessage, infoMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const PlanTemp = require('../models/planModel');
const BillingTemp = require('../models/billingModel');
const Appointment = require('../models/appointmentModel');
require('dotenv').config();
let ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');

const createPlanNote = async (req, res) => {
    try {
        let createParams = {
            appointmentId:new ObjectId(req.body.appointmentId),
            soap_note_type:req.body.soapNoteType,
            plan_note_type:req.body.planType,
            plan_note:req.body.planNote,
            freequency_per_week: req.body.frequencyPerWeek,
            duration_per_week: req.body.durationPerWeek,
            plan_start_date:new Date(req.body.planStartDate),
            plan_end_date:new Date(req.body.planEndDate),
            pt_treatment_provided:req.body.ptList,
            ot_treatment_provided:req.body.otList,
            slp_treatment_provided:req.body.slpList,
            createdBy: new ObjectId(req.body.endUserId),
        }
        await PlanTemp.create(createParams)
      commonHelper.sendResponse(res, 'success',{},'');
    } catch (error) {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const getPlanNote = async (req, res) => {
    try {
        planData = await PlanTemp.findOne({ appointmentId: req.body.appointmentId });
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
            plan_note_type:req.body.planType,
            plan_note:req.body.planNote,
            freequency_per_week: req.body.frequencyPerWeek,
            duration_per_week: req.body.durationPerWeek,
            plan_start_date:new Date(req.body.planStartDate),
            plan_end_date:new Date(req.body.planEndDate),
            pt_treatment_provided:req.body.ptList,
            ot_treatment_provided:req.body.otList,
            slp_treatment_provided:req.body.slpList,
            updatedAt: new Date()
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


module.exports = {
    createPlanNote,
    getPlanNote,
    updatePlanNote,
    createBillingNote,
    getBillingNote,
    updateBillingNote,
    finalizeNote
};