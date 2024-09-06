const { commonMessage, appointmentMessage, infoMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const PlanTemp = require('../models/planModel');
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
      commonHelper.sendResponse(res, 'success',);
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
        commonHelper.sendResponse(res, 'success',);
    } catch (error) {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}


module.exports = {
    createPlanNote,
    getPlanNote,
    updatePlanNote
};