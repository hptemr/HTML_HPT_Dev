const { commonMessage, appointmentMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
const sendEmailServices = require('../helpers/sendEmail');
const emailTemplateModel = require('../models/emailTemplateModel');
const s3 = require('./../helpers/s3Upload')
var constants = require('./../config/constants')
const s3Details = constants.s3Details;

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
        console.log("********Appointment***error***", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}


const getAppointmentDetails = async (req, res) => {
    try {
        const { query, fields, patientFields, therapistFields } = req.body;
        let appointmentData = await Appointment.findOne(query, fields)
            .populate('patientId', patientFields)
            .populate('therapistId', therapistFields);
        commonHelper.sendResponse(res, 'success', { appointmentData }, '');
    } catch (error) {
        console.log("********Appointment***error***", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}


const updatePatientCheckIn = async (req, res) => {
    try {
        const { query, updateInfo, } = req.body;
        let checkInDateTime = '';
        if (updateInfo.checkIn) {
            checkInDateTime = new Date();
        }
        await Appointment.findOneAndUpdate({ _id: query._id }, { checkIn: updateInfo.checkIn, checkInDateTime: checkInDateTime });
        commonHelper.sendResponse(res, 'success', null, 'Check in updated Successfully!');
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const acceptAppointment = async (req, res) => {
    try {
        const { query, } = req.body;
        await Appointment.findOneAndUpdate({ _id: query._id }, { status: 'Accepted' });
        commonHelper.sendResponse(res, 'success', null, appointmentMessage.accepted);
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const cancelAppointment = async (req, res) => {
    try {
        const { query, updateInfo } = req.body;
        await Appointment.findOneAndUpdate(query, updateInfo);
        commonHelper.sendResponse(res, 'success', null, appointmentMessage.cancelled);
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const addAppointment = async (req, res) => {
    try {
        let appointmentData = await Appointment.findOne({}, { appointmentId: 1 }).sort({ createdAt: -1 }).limit(1)
        let newRecord = new Appointment(req.body)
        newRecord.appointmentId = appointmentData.appointmentId + 1
        await newRecord.save()
        commonHelper.sendResponse(res, 'success', null, commonMessage.commonMessage);

        let uploadedInsuranceFiles = req.body.uploadedInsuranceFiles
        if (uploadedInsuranceFiles && uploadedInsuranceFiles.length > 0) {
            var s3InsurancePath = constants.s3Details.patientInsuranceFolderPath;
            for (let i = 0; i < uploadedInsuranceFiles.length; i++) {
                let fileName = uploadedInsuranceFiles[i].name
                let fileSelected = uploadedInsuranceFiles[i].data
                let fileBuffer = new Buffer(fileSelected.replace(fileSelected.split(",")[0], ""), "base64");
                let params = {
                    ContentEncoding: "base64",
                    ACL: "bucket-owner-full-control",
                    ContentType: fileSelected.split(";")[0],
                    Bucket: constants.s3Details.bucketName,
                    Body: fileBuffer,
                    Key: `${s3InsurancePath}${fileName}`,
                };
                await s3.uploadFileNew(params)
            }
        }

        let uploadedPrescriptionFiles = req.body.uploadedPrescriptionFiles
        if (uploadedPrescriptionFiles && uploadedPrescriptionFiles.length > 0) {
            var s3PrescriptionPath = constants.s3Details.patientPrescriptionFolderPath;
            for (let i = 0; i < uploadedPrescriptionFiles.length; i++) {
                let fileName = uploadedPrescriptionFiles[i].name
                let fileSelected = uploadedPrescriptionFiles[i].data
                let fileBuffer = new Buffer(fileSelected.replace(fileSelected.split(",")[0], ""), "base64");
                let params = {
                    ContentEncoding: "base64",
                    ACL: "bucket-owner-full-control",
                    ContentType: fileSelected.split(";")[0],
                    Bucket: constants.s3Details.bucketName,
                    Body: fileBuffer,
                    Key: `${s3PrescriptionPath}${fileName}`,
                };
                await s3.uploadFileNew(params)
            }
        }


        let template = await emailTemplateModel.findOne({ code: "bookAppointment" })
        if (template) {
            let params = {
                "{firstName}": newRecord.patientInfo.firstName
            }
            var mailOptions = {
                to: [newRecord.patientInfo.email],
                subject: template.mail_subject,
                html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
            }
            sendEmailServices.sendEmail(mailOptions)
        }

    } catch (error) {
        console.log("********addAppointment***error***", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const rescheduleAppointment = async (req, res) => {
    try {
        const { query, updateInfo } = req.body;
        await Appointment.findOneAndUpdate(query, updateInfo);
        commonHelper.sendResponse(res, 'success', null, appointmentMessage.rescheduled);
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const updateAppointment = async (req, res) => {
    try {
        const { query, updateInfo } = req.body;
        await Appointment.findOneAndUpdate(query, updateInfo);
        commonHelper.sendResponse(res, 'success', null, appointmentMessage.updated);
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

module.exports = {
    getAppointmentList,
    updatePatientCheckIn,
    getAppointmentDetails,
    acceptAppointment,
    cancelAppointment,
    addAppointment,
    updateAppointment,
    rescheduleAppointment,
};