const { sendEmail } = require('./emailSender');

const invitePracticeAdminEmail = async (email, link) => {
    await sendEmail(email, "Invite practice admin", link);
}

const passworsResetEmail = async (email, link) => {
    await sendEmail(email, "Password reset", link);
}

module.exports = {
    invitePracticeAdminEmail,
    passworsResetEmail
};