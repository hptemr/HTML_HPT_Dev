const sendEmailServices = require('../helpers/sendEmail');
require('dotenv').config();

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
  console.log('userData>>>',userData)
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
        console.log("appointmentRequestReceivedFromPatient error>>>>",error)
    } 
}

//Email sent to patient from ST after accepting/rejecting the appoitment request
const appointmentRequestReplyFromAdmin = async (templateName, patientData, link) => {
    try {
        sendEmailServices.getEmailTemplateByCode(templateName).then((template) => {
            if (template && patientData) {
                let params = {
                "{patientName}": patientData.firstName+' '+patientData.lastName,
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


module.exports = {
    inviteAdmin,
    unblockUser,
    resetPassword,
    patientSignup,
    patientSignupThroughRefferal,
    appointmentBookedThroughRefferal,
    appointmentRequestReceivedFromPatient,
    appointmentRequestReplyFromAdmin
};