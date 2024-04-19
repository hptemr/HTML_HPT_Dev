const nodemailer = require('nodemailer');

async function sendEmail(sendTo,subject,body) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'aylin.mclaughlin62@ethereal.email',
                pass: 'ggj7zUF5tMcKehre3Q'
            }
        });

        const mailOptions = {
            from: 'ashishb@arkenea.com',
            to: sendTo,
            subject: subject,
            html: body
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log('Error sending email:', error);
    }
}

module.exports = {
    sendEmail
};