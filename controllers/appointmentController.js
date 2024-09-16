const { commonMessage,userMessage, appointmentMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
const Patient = require('../models/patientModel');
const Case = require('../models/casesModel');
const sendEmailServices = require('../helpers/sendEmail');
const emailTemplateModel = require('../models/emailTemplateModel');
const AppointmentRequest = require('../models/appointmentRequestModel');
const triggerEmail = require('../helpers/triggerEmail');
const s3 = require('./../helpers/s3Upload')
var constants = require('./../config/constants')
let ObjectId = require('mongoose').Types.ObjectId;
const s3Details = constants.s3Details;
const crypto = require('crypto');

const getAppointmentList = async (req, res) => {
    try {
        const { query, fields, order, offset, limit, patientFields, therapistFields, userQuery, patientQuery } = req.body;
        if (userQuery && Object.keys(userQuery).length) {
            let userList = await User.find(userQuery, { _id: 1 });
            if (userList && userList.length > 0) {
                query['therapistId'] = { $in: userList }
            } else {
                query['noResults'] = true //if no records found then pass default condition just to failed query.
            }
        }

        // Patient Search
        if (patientQuery && Object.keys(patientQuery).length) {
            let patientList = await Patient.find(patientQuery, { _id: 1 });
            if (patientList && patientList.length > 0) {
                query['patientId'] = { $in: patientList }
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


const getAppointmentRequestList = async (req, res) => {
    try {
        const { query, fields, order, offset, limit, patientFields, userQuery } = req.body;
        if (userQuery && Object.keys(userQuery).length) {
            let userList = await Patient.find(userQuery, { _id: 1 });
            if (userList && userList.length > 0) {
                query['patientId'] = { $in: userList }
            } else {
                query['noResults'] = true //if no records found then pass default condition just to failed query.
            }
        }
        let appointmentRequestList = await AppointmentRequest.find(query, fields)
            .populate('resolvedBy', {"firstName": 1,"lastName": 1,"profileImage": 1})
            .populate('patientId', patientFields)
            .sort(order).skip(offset).limit(limit)

        let totalCount = await AppointmentRequest.find(query).countDocuments()

        commonHelper.sendResponse(res, 'success', { appointmentRequestList, totalCount }, '');
    } catch (error) {
        console.log("********Appointment***error***", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const getAppointmentRequestDetails = async (req, res) => {
    try {
        const { query, fields, patientFields } = req.body;
        
        let appointmentRequestData = await AppointmentRequest.findOne(query, fields)
            .populate('patientId', patientFields);

        let appointmentData = await Appointment.findOne({requestId:query._id}, { appointmentId: 1,therapistId:1,patientId:1,caseName:1,appointmentDate:1,practiceLocation:1,status:1 })

        let output = await Case.find({patientId:appointmentRequestData.patientId._id }, { patientId:1,caseName: 1,_id:1 });
        //let output = await Appointment.find({ caseName: { $ne: '' },patientId:appointmentRequestData.patientId._id }, { patientId:1,caseName: 1 });
        let caseNameList = ''; 
        if(output.length>0){
             caseNameList = output.filter((obj) => {
                return (obj.caseName);
            });
        }

        commonHelper.sendResponse(res, 'success', { appointmentRequestData,appointmentData,caseNameList }, '');
    } catch (error) {
        console.log("********Appointment Request Details***error***", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}


const createAppointment = async (req, res) => {
    try {
        const { data,userId,requestId,patientType } = req.body;
        //data.appointmentDate = new Date(data.appointmentDate)        
            let alreadyFound = []; let proceed = true;

            if(patientType=='New'){
                alreadyPatient = await Patient.findOne({email:data.email,status: { $ne: 'Deleted' }});
                if (alreadyPatient) {
                    proceed = false;
                    let validations = { 'email': appointmentMessage.patientEmailExist }
                    commonHelper.sendResponse(res, 'errorValidation', validations, 'Please check the validation field.');
                }
            }

            if(requestId){
                const filterRequest = { _id:requestId };
                const updateRequest = {
                    $set: {
                        status: 'Accepted',
                        resolved:true,
                        resolvedBy:userId,
                        resolvedOn:new Date()
                    }
                };
                await AppointmentRequest.findOneAndUpdate(filterRequest, updateRequest);
                alreadyFound = await Appointment.findOne({requestId:requestId}, { _id:1,appointmentId: 1 });//.sort({ createdAt: -1 }).limit(1)
            }    
           
            if(proceed){           
                let existingAppointmentData = alreadyFound;
                let appointmentId = 1;
                if(existingAppointmentData.length==0){
                    existingAppointmentData = await Appointment.findOne({}, { _id:1,appointmentId: 1 }).sort({ createdAt: -1 }).limit(1)
                    appointmentId = existingAppointmentData.appointmentId + 1;
                }else if(alreadyFound && alreadyFound.appointmentId){
                    appointmentId = alreadyFound.appointmentId;
                }

                let caseType = data.caseType ? data.caseType : '';
                let caseName = data.caseName=='Other' ? data.caseNameOther : data.caseName
                let caseFound = await Case.findOne({caseName:caseName,patientId:data.patientId}, { _id: 1,caseType:1,appointments:1 });
                let caseId = '';
                if(caseFound){
                    caseId = caseFound._id;
                }
                if(!caseFound){
                    let caseData = {
                        caseName:caseName,
                        caseType : caseType,
                        patientId:data.patientId,
                    };
                    let newCaseRecord = new Case(caseData)
                    const caseResult = await newCaseRecord.save();
                    caseId = caseResult._id;
                }else if(caseType==''){
                    caseType = caseFound.caseType ? caseFound.caseType : ''
                }
                let appointmentData = {
                    appointmentId:appointmentId,
                    caseName: caseName,
                    caseType : caseType,
                    appointmentType : data.appointmentType,
                    appointmentTypeOther : data.appointmentTypeOther,
                    appointmentDate: data.appointmentDate,//data.appointmentDate.year+'-'+data.appointmentDate.month+'-'+data.appointmentDate.day,
                    practiceLocation: data.practiceLocation,
                    therapistId: data.therapistId ? data.therapistId : '',
                    patientId: data.patientId,
                    doctorId: data.doctorId ? data.doctorId : '',
                    requestId: requestId ? requestId : '',            
                    acceptInfo: {fromAdminId:userId}
                }

                if(appointmentData.requestId==''){
                    delete appointmentData['requestId']; 
                }

                let result = [];let msg = '';
                if(alreadyFound.length==0){
                    let newRecord = new Appointment(appointmentData)
                    result = await newRecord.save()
                    msg = appointmentMessage.created;
                    if(caseId){
                        const caseRequest = {
                            $set: {
                                appointments:result._id
                            }
                        };
                        await Case.findOneAndUpdate({_id:caseId}, caseRequest);
                    }
                }else{
                    msg = appointmentMessage.updated;
                    result = await Appointment.findOneAndUpdate({_id:alreadyFound._id},appointmentData);
                }
                if(patientType=='New'){
                    const therapistData = await User.findOne({_id:data.therapistId},{firstName:1,lastName:1});
                    
                    const patientData = {firstName:data.firstName,lastName:data.lastName,email:data.email,phoneNumber:data.phoneNumber,practice_location:data.practiceLocation,therapistId:data.therapistId,therapist_name:therapistData.firstName+' '+therapistData.lastName,appointment_date:data.appointmentDate,caseId:caseId,appId:result._id};
                    patientAppointmentSignupEmail(patientData)
                }
                commonHelper.sendResponse(res, 'success', result, msg);
            }
      } catch (error) {
        console.log("error>>>", error)
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

const createAppointmentRequest = async (req, res) => {
    try {
        const { userId, data } = req.body;
        // console.log('data>>>',data)
        // data.appointmentDate = new Date(data.appointmentDate)
        // console.log('>>>>>>>',new Date(data.appointmentDate).toString())
        // console.log('>>>>>>>',new Date(data.appointmentDate).toISOString())
        // let appointmentRequestData = await AppointmentRequest.findOne({patientId:userId,practiceLocation:data.practiceLocation,status:'Pending'});
        // if(appointmentRequestData){
        //     commonHelper.sendResponse(res, 'errorValidation', null, appointmentMessage.alreadyRequestCreated);
        // }else{

        let newAppointmentRequest = new AppointmentRequest(data);
        const result = await newAppointmentRequest.save();

        const adminData = await User.findOne({role:"support_team",status:"Active"},{firstName:1,lastName:1,email:1});
        const patientData = await Patient.findOne({_id:data.patientId},{firstName:1,lastName:1,email:1});
        const link = `${process.env.BASE_URL}/support-team/create-request-appointment/${result._id}`;
        
        triggerEmail.appointmentRequestReceivedFromPatient('appointmentRequestReceivedFromPatient', adminData,patientData,link)
        commonHelper.sendResponse(res, 'success', null, appointmentMessage.requestCreated);
        //}
    } catch (error) {
        console.log("********addAppointment***error***", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const acceptAppointment = async (req, res) => {
    try {
        const { query,userId,userRole,data } = req.body;
        let therapistId = data.therapistId.id;
        delete data.therapistId;
        data.therapistId = therapistId;
        data.status      = 'Accepted';
        data.acceptInfo  = {
              fromAdminId: userId,
              userRole: userRole           
        }
        await Appointment.findOneAndUpdate({ _id: query._id },data);
        commonHelper.sendResponse(res, 'success', null, appointmentMessage.accepted);
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const resolvedRequest = async (req, res) => {
    try {
        const { query, updateInfo } = req.body;
        
        Object.assign(updateInfo, { resolvedOn:new Date() })
        await AppointmentRequest.findOneAndUpdate(query, updateInfo);
        commonHelper.sendResponse(res, 'success', null, appointmentMessage.resolved);
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

        await s3UploadDocuments(req, res)

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
        const { query, updateInfo, email, firstName } = req.body;
        await Appointment.findOneAndUpdate(query, updateInfo); 

        let template = await emailTemplateModel.findOne({ code: "rescheduledAppointment" })
        if (template) {
            let url = constants.clientUrl + '/patient/appointments'
            let params = {
                "{firstName}": firstName,
                "{url}": url
            }
            var mailOptions = {
                to: [email],
                subject: template.mail_subject,
                html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
            }
            sendEmailServices.sendEmail(mailOptions)
        }

        commonHelper.sendResponse(res, 'success', null, appointmentMessage.rescheduled);
    } catch (error) {
        console.log("********rescheduleAppointment***error***", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const updateAppointment = async (req, res) => {
    try {
        const { query, updateInfo, uploadedInsuranceFiles, uploadedPrescriptionFiles } = req.body;
        await Appointment.findOneAndUpdate(query, updateInfo);

        if ((uploadedInsuranceFiles && uploadedInsuranceFiles.length > 0) || (uploadedPrescriptionFiles && uploadedPrescriptionFiles.length > 0)) {
            await s3UploadDocuments(req, res)
        }

        commonHelper.sendResponse(res, 'success', null, appointmentMessage.updated);
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

async function s3UploadDocuments(req, res) {
    let uploadedInsuranceFiles = req.body.uploadedInsuranceFiles
    if (uploadedInsuranceFiles && uploadedInsuranceFiles.length > 0) {
        var s3InsurancePath = constants.s3Details.patientInsuranceFolderPath;
        for (let i = 0; i < uploadedInsuranceFiles.length; i++) {
            if (uploadedInsuranceFiles[i].data && uploadedInsuranceFiles[i].data != '') {
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
    }

    let uploadedPrescriptionFiles = req.body.uploadedPrescriptionFiles
    if (uploadedPrescriptionFiles && uploadedPrescriptionFiles.length > 0) {
        var s3PrescriptionPath = constants.s3Details.patientPrescriptionFolderPath;
        for (let i = 0; i < uploadedPrescriptionFiles.length; i++) {
            if (uploadedPrescriptionFiles[i].data && uploadedPrescriptionFiles[i].data != '') {
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
    }
}

const download = async (req, res) => {
    try {
        const { fileName, filePath } = req.body;
        var AWS = require("aws-sdk");
        AWS.config.update({
            accessKeyId: constants.s3Details.awsKey,
            secretAccessKey: constants.s3Details.awsSecret,
        });
        var s3 = new AWS.S3()
        const url = await s3.getSignedUrl('getObject', {
            Bucket: constants.s3Details.bucketName,
            Key: filePath + fileName
        })
        commonHelper.sendResponse(res, 'success', { url: url }, 'download');
    } catch (error) {
        console.log("********** error***", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}


const getPatientCaseList = async (req, res) => {
    try {
        const { query } = req.body;
        console.log("********Appointment Request Details***error***", query.id)
        let output = await Case.find({patientId:query.id }, { patientId:1,caseName: 1,caseType: 1,_id:1 });
        let caseNameList = []; 
        if(output.length>0){
              output.filter((obj) => {
                caseNameList.push({caseName:obj.caseName,caseType:obj.caseType})             
            });
        }
        commonHelper.sendResponse(res, 'success', { caseNameList }, '');
    } catch (error) {
        console.log("********get Patient Case List ***error***", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

async function patientAppointmentSignupEmail(patientData) {
    try {
        let request_data = {
            firstName: patientData.firstName,
            lastName: patientData.lastName,
            email: patientData.email,
            phoneNumber: patientData.phoneNumber,
            status: 'Pending'
        }     
        console.log('Patient_data>>>',request_data)

        let newPatient = new Patient(request_data);
        const patient_result = await newPatient.save();
        // let tokenObj = {
        //     tokenExpiry: Date.now() + (120 * 60 * 1000),
        //     userId: patient_result._id
        // }
        // let encryptToken = commonHelper.encryptData(tokenObj, process.env.CRYPTO_SECRET)
        let encryptToken = crypto.randomBytes(50).toString('hex');
        const updateDoc = {
            $set: {
                signupToken: encryptToken
            }
        };
        const options = { returnOriginal: false };
        await Patient.findOneAndUpdate({ _id: new ObjectId(patient_result._id) }, updateDoc, options);

        const caseRequest = {
            $set: {
                patientId: patient_result._id,
            }
        };
        await Case.findOneAndUpdate({_id:patientData.caseId}, caseRequest);
        const appRequest = {
            $set: {
                patientId: patient_result._id,
            }
        };
        await Appointment.findOneAndUpdate({_id:patientData.appId},appRequest); 

        const link = `${process.env.BASE_URL}/signup/${encryptToken}/`;
        patientData.link = link;
        patientData.appointmentSignup = 'yes';
        triggerEmail.patientSignup('patientAppointmentSignup', patientData);

        return true;
    } catch (error) {
        console.log('query error >>>', error)
        return error;
    }
};


module.exports = {
    getAppointmentList,
    updatePatientCheckIn,
    getAppointmentDetails,
    createAppointmentRequest,
    acceptAppointment,
    resolvedRequest,
    cancelAppointment,
    addAppointment,
    updateAppointment,
    rescheduleAppointment,
    download,
    getAppointmentRequestList,
    getAppointmentRequestDetails,
    createAppointment,
    getPatientCaseList
};