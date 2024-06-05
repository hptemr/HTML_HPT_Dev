const { commonMessage, emergencyContactsMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const EmergencyContact = require('../models/emergencyContactModel');

const addUpdateEmergencyContact = async (req, res) => {
    try {
        const { query, data } = req.body;
        let result = {};
        if (data.contacts) {
            await EmergencyContact.deleteMany({ patientId: query._id });
            for (i = 0; i < data.contacts.length; i++) {
                let item = data.contacts[i];
                let dob = '';
                if (item.dob) {
                    dob = item.dob;
                    dob = dob.year + '-' + dob.month + '-' + dob.day;
                }
                let request_data = {
                    patientId: query._id,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    dob: dob,
                    relationWithPatient: item.relationWithPatient,
                    otherRelation: item.otherRelation,
                    phoneNumber: item.phoneNumber,
                    myTreatmentCheckbox: item.myTreatmentCheckbox,
                    myAccountCheckbox: item.myAccountCheckbox,
                    orderIndex: i + 1
                }
                let newContact = new EmergencyContact(request_data);
                result = await newContact.save();
            }
        }
        commonHelper.sendResponse(res, 'success', null, emergencyContactsMessage.saved);
    } catch (error) {
        console.log('error>>>', error);
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const getContactData = async (req, res) => {
    try {
        const { query, order } = req.body;
        let records = await EmergencyContact.find({ patientId: query._id }).sort(order);
        let emergencyContactList = [];
        if (records && records.length > 0) {
            emergencyContactList = records;
        }
        commonHelper.sendResponse(res, 'success', emergencyContactList, '');
    } catch (error) {
        console.log('error>>>', error);
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}
module.exports = {
    addUpdateEmergencyContact,
    getContactData
};