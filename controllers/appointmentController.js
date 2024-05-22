const { commonMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');

const getAppointmentList = async (req, res) => {
    try {
        const { query, fields, order, offset, limit, patientFields, therapistFields, userQuery } = req.body;
        if (userQuery && Object.keys(userQuery).length) {
            let userList = await User.find(userQuery, { _id: 1 });
            if (userList && userList.length > 0) {
                query['therapistId'] = { $in: userList }
            } else {
                query['noResults'] = true //if no records found then pass default condition just to failed query.
            }
        }
        let appointmentList = await Appointment.find(query, fields)
            .populate('patientId', patientFields)
            .populate('therapistId', therapistFields)
            .sort(order).skip(offset).limit(limit)
        let totalCount = await Appointment.find(query).countDocuments()
        commonHelper.sendResponse(res, 'success', { appointmentList, totalCount }, '');
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

module.exports = {
    getAppointmentList,
};