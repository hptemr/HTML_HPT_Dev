const { sendEmail } = require('./emailSender');

const invitePracticeAdminEmail = async (email, link) => {
    await sendEmail(email, "Invite practice admin", link);
}

const passworsResetEmail = async (email, link) => {
    await sendEmail(email, "Password reset", link);
}

const unblockUserEmail = async (email, password) => {
    await sendEmail(email, "User unblocked successfully", password);
}

module.exports = {
    invitePracticeAdminEmail,
    passworsResetEmail,
    unblockUserEmail
};