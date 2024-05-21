const { commonMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const Appointment = require('../models/appointmentModel');

const getAppointmentList = async (req, res) => {
    try {
        const { query, fields, order, offset, limit, patientFields, therapistFields } = req.body;
        let appointmentList = await Appointment.find(query, fields)
            .populate('patientId', patientFields)
            .populate('therapistId', therapistFields)
            .sort(order).skip(offset).limit(limit);
        let totalCount = await Appointment.find(query).count()
        commonHelper.sendResponse(res, 'success', { appointmentList, totalCount }, '');
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

module.exports = {
    getAppointmentList,
};