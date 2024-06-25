const User = require('../models/userModel');
const Referral = require('../models/referralModel');
const { commonMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');

const getReferralDetails = async (req, res) => {
  try {
    const { query, fields } = req.body
    const result = await Referral.findOne(query, fields);
    commonHelper.sendResponse(res, 'success', result, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getReferralList = async (req, res) => {
  try {
    const { query, fields, order, offset, limit } = req.body;
    let referralList = await Referral.find(query, fields).sort(order).skip(offset).limit(limit);
    let totalCount = await Referral.find(query).count()
    commonHelper.sendResponse(res, 'success', { referralList, totalCount }, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}
 
module.exports = {
  getReferralDetails,
  getReferralList
};