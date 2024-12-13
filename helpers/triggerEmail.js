const sendEmailServices = require('../helpers/sendEmail');
require('dotenv').config();
const User = require('../models/userModel');
const Patient = require('../models/patientModel');
let constants = require('./../config/constants')

const inviteAdmin = async (templateName, userData, link) => {
    try {
        sendEmailServices.getEmailTemplateByCode(templateName).then((template) => {
            if (template) {
                let params = {
                "{firstName}": userData.firstName,
                "{link}": link
                }
                var mailOptions = {
                    to: [userData.email],
                    subject: template.mail_subject,
                    html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
                }
                sendEmailServices.sendEmail(mailOptions)
            } else {
                console.log("Templete not found>>>>")
            }
        })
    } catch (error) {
        console.log("inviteAdmin error>>>>",error)
    } 
}

const unblockUser = async (templateName, userData, randomPassword) => {
    try {
        sendEmailServices.getEmailTemplateByCode(templateName).then((template) => {
            if (template) {
                let params = {
                "{firstName}": userData.firstName,
                "{password}": randomPassword,
                "{link}": process.env.BASE_URL
                }
                var mailOptions = {
                    to: [userData.email],
                    subject: template.mail_subject,
                    html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
                }
                sendEmailServices.sendEmail(mailOptions)
            } else {
                console.log("Templete not found>>>>")
            }
        })
    } catch (error) {
        console.log("unblockUser error>>>>",error)
    } 
}

const resetPassword = async (templateName, userData, link) => {
    try {
        sendEmailServices.getEmailTemplateByCode(templateName).then((template) => {
            if (template) {
                let params = {
                "{firstName}": userData.firstName,
                "{link}": link
                }
                var mailOptions = {
                    to: [userData.email],
                    subject: template.mail_subject,
                    html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
                }
                
                sendEmailServices.sendEmail(mailOptions)
            } else {
                console.log("Templete not found>>>>")
            }
        })
    } catch (error) {
        console.log("resetPassword error>>>>",error)
    } 
}


const patientSignup = async (templateName, userData) => {
    try {
        sendEmailServices.getEmailTemplateByCode(templateName).then((template) => {
            if (template) {
                console.log('userData >>>>>>',userData)
                let params = {
                "{firstName}": userData.firstName,
                "{link}": userData.link
                }

                if(userData.appointmentSignup && userData.appointmentSignup=='yes'){
                params = {
                    "{firstName}": userData.firstName,
                    "{therapist_name}": userData.therapist_name,
                    "{appointment_date}": userData.appointment_date,
                    "{practice_location}": userData.practice_location,
                    "{link}": userData.link
                    }
                }
                console.log('params >>>>>>',params)
                var mailOptions = {
                    to: [userData.email],
                    subject: template.mail_subject,
                    html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
                }
                sendEmailServices.sendEmail(mailOptions)
            } else {
                console.log("Templete not found>>>>")
            }
        })
    } catch (error) {
        console.log("resetPassword error>>>>",error)
    } 
}

const patientSignupThroughRefferal = async (templateName, patientData, link) => {
    try {
        sendEmailServices.getEmailTemplateByCode(templateName).then((template) => {
            if (template) {
                let params = {
                "{firstName}": patientData.firstName,
                "{link}": link
                }
                var mailOptions = {
                    to: [patientData.email],
                    subject: template.mail_subject,
                    html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
                }
                
                sendEmailServices.sendEmail(mailOptions)
            } else {
                console.log("Templete not found>>>>")
            }
        })
    } catch (error) {
        console.log("patientSignupThroughRefferal error>>>>",error)
    } 
}

const appointmentBookedThroughRefferal = async (templateName, patientData) => {
    try {
        sendEmailServices.getEmailTemplateByCode(templateName).then((template) => {
            if (template) {
                let params = {
                "{firstName}": patientData.firstName
                }
                var mailOptions = {
                    to: [patientData.email],
                    subject: template.mail_subject,
                    html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
                }
                
                sendEmailServices.sendEmail(mailOptions)
            } else {
                console.log("Templete not found>>>>")
            }
        })
    } catch (error) {
        console.log("appointmentBookedThroughRefferal error>>>>",error)
    } 
}

//Email sent to ST from patient after creating the request from patient
const appointmentRequestReceivedFromPatient = async (templateName, adminData,patientData, link) => {
    try {
        sendEmailServices.getEmailTemplateByCode(templateName).then((template) => {
            if (template && adminData && patientData) {
                let params = {
                "{firstName}":adminData.firstName,
                "{patientName}": patientData.firstName+' '+patientData.lastName,
                "{link}": link,
                "{BASE_URL}":process.env.BASE_URL
                }
                var mailOptions = {
                    to: [adminData.email],
                    cc: ['rohini+1001@arkenea.com'],
                    subject: template.mail_subject,
                    html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
                }            
                sendEmailServices.sendEmail(mailOptions)
            } else {
                console.log("Templete not found >>>>")
            }
        })
    } catch (error) {
        console.log("appointment Request Received From Patient error>>>>",error)
    } 
}

//Email sent to patient from ST after accepting/rejecting the appoitment request
const appointmentRequestReplyFromAdmin = async (templateName, patientData, link) => {
    try {
        sendEmailServices.getEmailTemplateByCode(templateName).then((template) => {
            if (template && patientData) {
                let params = {
                "{patientName}": patientData.firstName,
                "{firstName}": patientData.firstName,
                "{appointment_date}": patientData.appointment_date,
                "{practice_location}": patientData.practice_location,
                "{therapist_name}": patientData.therapist_name,
                "{link}": link,
                "{BASE_URL}":process.env.BASE_URL
                }
                var mailOptions = {
                    to: [patientData.email],
                    cc: ['rohini+1001@arkenea.com'],
                    subject: template.mail_subject,
                    html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
                }
                
                sendEmailServices.sendEmail(mailOptions)
            } else {
                console.log("Templete not found >>>>")
            }
        })
    } catch (error) {
        console.log("appointmentRequestReceivedFromPatient error>>>>",error)
    } 
}

//Email sent to patient from ST after creating the appoitment from admin side
const appointmentCreatedByAdminReplyPatient = async (templateName, patientData, link) => {
    try {
        sendEmailServices.getEmailTemplateByCode(templateName).then((template) => {
            if (template && patientData) {
                let params = {
                "{firstName}": patientData.firstName+' '+patientData.lastName,
                "{appointment_date}": patientData.appointment_date,
                "{practice_location}": patientData.practice_location,
                "{therapist_name}": patientData.therapist_name,
                "{link}": link,
                "{BASE_URL}":process.env.BASE_URL
                }
                console.log("appointmentCreatedByAdminReplyPatient params >>>>",params)
                var mailOptions = {
                    to: [patientData.email],
                    cc: ['rohini+1002@arkenea.com'],
                    subject: template.mail_subject,
                    html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
                }
              
                sendEmailServices.sendEmail(mailOptions)
            } else {
                console.log("Templete not found >>>>")
            }
        })
    } catch (error) {
        console.log("appointmentRequestReceivedFromPatient error>>>>",error)
    } 
}

const patientIntakeFormSubmitEmailToST = async (templateName,appointment_data, patientData) => {
    try {
        console.log("appointment_data>>",appointment_data)
        if(appointment_data && appointment_data!=null){
            // Fetch all support team users
            const users = await User.find({role:'support_team'}, 'firstName lastName email');
            // const patientData = await Patient.findOne(appointment_data.patientId, 'firstName lastName');
            console.log("patientData>>",patientData)
            console.log("users>>",users)
            // let template = await getEmailTemplateByCode.findOne({ code: templateName })
            let template = await sendEmailServices.getEmailTemplateByCode(templateName)
            if(template!=null && users.length){

                // let usersNew= [{
                //     firstName: 'Lancaster',
                //     lastName: 'Bentley',
                //     email: 'ashishb+46@arkenea.com'
                // },
                // {
                //     firstName: 'Peter',
                //     lastName: 'SupportTeamUSer',
                //     email: 'ashishb+45@arkenea.com'
                // },
                // {
                //     firstName: 'Rohini',
                //     lastName: 'ST',
                //     email: 'ashishb+44@arkenea.com'
                // }
                // ]

                let link = constants.clientUrl + '/support-team/case-details/'+ appointment_data._id
                for (let user of users) {
                    let params = {
                        "{stAdminName}": user.firstName,
                        "{patientName}": `${patientData?.firstName} ${patientData?.lastName}`,
                        "{link}":link
                    }

                    var mailOptions = {
                        to: [user.email],
                        subject: template.mail_subject,
                        html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
                    }
                    sendEmailServices.sendEmail(mailOptions)
                } 
            }
        }
    } catch (error) {
        console.log("intakeFormEmailToST error>>>>",error)
    }
}


const appointmentNotificationPatient = async (templateName,appointment_data,patientData) => {
    try {
        if(appointment_data && appointment_data!=null && patientData && patientData!=null){
            let template = await sendEmailServices.getEmailTemplateByCode(templateName)
            if(template!=null){
                let params = {
                    "{firstName}": patientData.firstName,
                    "{appointment_date}": `${appointment_data.appointmentDate}`,
                }
                var mailOptions = {
                    to: [patientData.email],
                    subject: template.mail_subject,
                    cc: ['pankajk+51@arkenea.com'],
                    html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
                }
                sendEmailServices.sendEmail(mailOptions)
                return true;
            }
        }        
    } catch (error) {
        console.log("Appointment Notification Patient Error>>>>",error)
    }
}

module.exports = {
    inviteAdmin,
    unblockUser,
    resetPassword,
    patientSignup,
    patientSignupThroughRefferal,
    appointmentBookedThroughRefferal,
    appointmentRequestReceivedFromPatient,
    appointmentRequestReplyFromAdmin,
    appointmentCreatedByAdminReplyPatient,
    patientIntakeFormSubmitEmailToST,
    appointmentNotificationPatient
};