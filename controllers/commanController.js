const practiceLocation = require('../models/practiceLocationModel');
const { commonMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');


const getPracticeLocation = async (req, res, next) => {
  try {
    const result = await practiceLocation.find().lean();
    commonHelper.sendResponse(res, 'success', result, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};


module.exports = {
    getPracticeLocation
};