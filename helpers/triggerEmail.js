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

const appointmentBookedThroughRefferal = async (templateName, patientData, link) => {
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


module.exports = {
    inviteAdmin,
    unblockUser,
    resetPassword,
    patientSignup,
    patientSignupThroughRefferal,
    appointmentBookedThroughRefferal
};