const { commonMessage, appointmentMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const Insurance = require('../models/insuranceModel');

const getInsuranceList = async (req, res) => {
    try {
        const { query, fields, order, offset, limit } = req.body;
        let insuranceList = await Insurance.find(query, fields)
            .sort(order).skip(offset).limit(limit)
        let totalCount = await Insurance.find(query).countDocuments()
        commonHelper.sendResponse(res, 'success', { insuranceList, totalCount }, '');
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}


const getInsuranceDetails = async (req, res) => {
    try {
        const { query, fields } = req.body;
        let insuranceData = await Insurance.findOne(query, fields).collation({ locale: 'en', strength: 2 })
        commonHelper.sendResponse(res, 'success', { insuranceData }, '');
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const addInsurance = async (req, res) => {
    try {
        let newRecord = new Insurance(req.body)
        await newRecord.save();
        commonHelper.sendResponse(res, 'success', null, commonMessage.commonMessage);
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

module.exports = {
    addInsurance,
    getInsuranceList,
    getInsuranceDetails,
};