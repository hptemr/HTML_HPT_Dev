const { commonMessage, emergencyContactsMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const EmergencyContact = require('../models/emergencyContactModel');

// const addUpdateEmergencyContact = async (req, res) => {
//     try {
//         const { query, data } = req.body;
//         let result = {};
//         if (data.contacts) {
//             await EmergencyContact.deleteMany({ patientId: query._id });
//             for (i = 0; i < data.contacts.length; i++) {
//                 let item = data.contacts[i];
//                 let dob = '';
//                 if (item.dob) {
//                     dob = item.dob;
//                     dob = dob.year + '-' + dob.month + '-' + dob.day;
//                 }
//                 let request_data = {
//                     patientId: query._id,
//                     firstName: item.firstName,
//                     lastName: item.lastName,
//                     dob: dob,
//                     relationWithPatient: item.relationWithPatient,
//                     otherRelation: item.otherRelation,
//                     phoneNumber: item.phoneNumber,
//                     myTreatmentCheckbox: item.myTreatmentCheckbox,
//                     myAccountCheckbox: item.myAccountCheckbox,
//                     orderIndex: i + 1
//                 }
//                 let newContact = new EmergencyContact(request_data);
//                 result = await newContact.save();
//             }
//         }
//         commonHelper.sendResponse(res, 'success', null, emergencyContactsMessage.saved);
//     } catch (error) {
//         console.log('error>>>', error);
//         commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
//     }
// }


const getContactListData = async (req, res) => {
    try {
        const { query, fields, order, offset, limit } = req.body;
        let emergencyContactList = await EmergencyContact.find(query, fields).sort(order).skip(offset).limit(limit)
        let totalCount = await EmergencyContact.find(query).countDocuments()
        commonHelper.sendResponse(res, 'success', { emergencyContactList, totalCount }, '');
    } catch (error) {
        console.log('error>>>', error);
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const getContactData = async (req, res) => {
    try {
        const { query, fields} = req.body;
        let emergencyContactData = await EmergencyContact.findOne(query, fields)
      
        commonHelper.sendResponse(res, 'success', { emergencyContactData }, '');
    } catch (error) {
        console.log('error>>>', error);
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const addContact = async (req, res) => {
    try {
        const { query, data } = req.body;
        let result = {};
        if(data){        
            let item = data;
            // let dob = '';
            // if (item.dob) {
            //     dob = item.dob;
            //     dob = dob.year + '-' + dob.month + '-' + dob.day;
            // }
            let request_data = {
                patientId: query.patientId,
                firstName: item.firstName,
                lastName: item.lastName,
                dob: item.dob,
                relationWithPatient: item.relationWithPatient,
                otherRelation: item.otherRelation,
                phoneNumber: item.phoneNumber,
                myTreatmentCheckbox: item.myTreatmentCheckbox,
                myAccountCheckbox: item.myAccountCheckbox
            }
            let newContact = new EmergencyContact(request_data);
            result = await newContact.save();

            commonHelper.sendResponse(res, 'success', null, emergencyContactsMessage.created);
        }
    } catch (error) {
        console.log('error>>>', error);
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const updateContact = async (req, res) => {
    try {
        const { query, data } = req.body;
        // let dob = '';
        // if (data.dob) {
        //     dob = data.dob;
        //     dob = dob.year + '-' + dob.month + '-' + dob.day;
        //     data.dob = dob;
        // }
        let result = await EmergencyContact.findOneAndUpdate({ _id: query._id }, data);
        if(result){
            commonHelper.sendResponse(res, 'success', null, emergencyContactsMessage.updated);
        }else{
            commonHelper.sendResponse(res, 'success', null, commonMessage.wentWrong);
        }        
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}


const deleteContact = async (req, res) => {
    try {
        const { query } = req.body;

        let result = await EmergencyContact.deleteOne(query);
        if(result){
            commonHelper.sendResponse(res, 'success', null, emergencyContactsMessage.deleted);
        }else{
            commonHelper.sendResponse(res, 'success', null, commonMessage.wentWrong);
        }  
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

module.exports = {
    addContact,
    updateContact,
    deleteContact,
    getContactData,
    getContactListData
};