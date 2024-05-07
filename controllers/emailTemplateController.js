require('dotenv').config();
const { commonMessage, infoMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const sendEmailServices = require('../helpers/sendEmail');
const emailTemplateModel = require('../models/emailTemplateModel');

const emailSend = async (req, res) => {
    try {
        const { query, params, toEmail } = req.body
        let template = await emailTemplateModel.findOne(query)
        if (template) {
            var mailOptions = {
                to: [toEmail],
                subject: template.mail_subject,
                html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
            }
            sendEmailServices.sendEmail(mailOptions)
            commonHelper.sendResponse(res, 'success', template, infoMessage.emailSent);
        } else {
            commonHelper.sendResponse(res, 'error', null, infoMessage.emailTemplate404);
        }
    } catch (error) {
        console.log("******error**", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

module.exports = {
    emailSend
};