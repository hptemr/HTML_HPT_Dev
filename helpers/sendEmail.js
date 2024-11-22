const constants = require('../config/constants')
const nodemailer = require("nodemailer");
const AWS = require('aws-sdk');
const emailTemplateModel = require('../models/emailTemplateModel');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: constants.gmail.email,
    pass: constants.gmail.secret //cbchaiekjqtogdfb
  }
})

AWS.config.update({
  accessKeyId: "AKIATCKAO35IMHQ74HCF",
  secretAccessKey: "4nlogMc+31dzs/HBd0zDTSbyhLzbwInIIUvY52ox",
  region: "us-east-1", // Replace with your SES region
});


const sendEmail = async (mailOptions) => {
  mailOptions.html = '<html><head><link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></head><body style="margin: 0;background: #fff;"><table style="border: 1px solid #ddd; margin: 15px auto;font-family: \'Open Sans\', \'Arial\', \'sans-serif\'; font-size: 13px; color: #2c2c2c; background: #f7f7f7;" width="600" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="background: #f6f7f7;border-bottom: 1px solid #ccc;padding: 0 60px;"><table style="width:100%"><tr><td style="padding: 21px 0; text-align:center"><img src="http://44.198.155.17/assets/images/logo/logo.webp" alt="HPT EHR" /></td></tr></table></td></tr><tr><td><table style="background: #fff;padding: 20px 60px;" width="600" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-size: 14px;padding-bottom: 26px;"> ' + mailOptions.html + ' </td></tr><tr><td style="line-height: 27px; padding: 17px 0 0;text-align: center;"><br /></td></tr></tbody></table></td></tr><tr><td style="font-size: 14px;padding: 17px;border-top: 1px solid #ccc;text-align: center;background: #f6f7f7;color: #999;font-weight: 600;"><span style="margin: 0;display: block;">© HPT EHR 2024</span></td></tr></tbody></table></body></html>';
  mailOptions.from = "HPT EHR<" + constants.gmail.fromEmail + ">",
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("********Email error: ", error)
      } else {
        console.log("********Email sent to: ", mailOptions.to)
      }
    })
}

//replace dynamic keys with actual values
const generateContentFromTemplate = (content, params) => {
  for (var key in params) {
    content = content.replaceAll(key, params[key])
  }
  return content.trim()
}

function getEmailTemplateByCode (codeName) {
  const emailTemplate = emailTemplateModel.findOne({code: codeName, status:'Active'}); 
  return emailTemplate
}

const sendAwsEmail = async () => {
  const ses = new AWS.SES();
  const params = {
    Source: "ahptehr@gmail.com", // Verified sender email   pankajk@arkenea.com
    Destination: {
      ToAddresses: ["rohini@arkenea.com"], // Recipient email
    },
    Message: {
      Subject: {
        Data: "Test Email",
      },
      Body: {
        Text: {
          Data: "Hello! This is a test email sent using Amazon SES.",
        },
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


module.exports = {
  sendEmail,
  sendAwsEmail,
  generateContentFromTemplate,
  getEmailTemplateByCode
}