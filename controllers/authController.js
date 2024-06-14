require('dotenv').config();
const { userMessage, commonMessage, infoMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const userCommonHelper = require('../helpers/userCommon');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Patient = require('../models/patientModel');
let ObjectId = require('mongoose').Types.ObjectId;
const triggerEmail = require('../helpers/triggerEmail');

const userLogin = async (req, res) => {
    try {
        const { email } = req.body;
        let userData = await userCommonHelper.userGetByEmail(email)
        let loginCount = userData.loginCount + 1
        if (loginCount > 200) { //its 2 value but for testing its 20
            commonHelper.sendResponse(res, 'error', null, userMessage.loginCounterMessage);
        } else {
            await User.findOneAndUpdate({ email: email }, { $set: { failedAttempts: 0, loginCount: loginCount } })
            const token = jwt.sign({ _id: userData._id }, process.env.SECRET, { expiresIn: '1d' });
            let returnData = {
                _id: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                role: userData.role,
                token: token,
                loginCount: loginCount,
                profileImage: userData.profileImage
            };
            commonHelper.sendResponse(res, 'success', returnData, commonMessage.login);
        }
    } catch (error) {
        console.log("error>>>", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email, userType } = req.body;
        let userData = '';

        if (userType == 'patient') {
            userData = await userCommonHelper.patientGetByEmail(email)
        } else {
            userData = await userCommonHelper.userGetByEmail(email)
        }

        if (!userData) {
            return commonHelper.sendResponse(res, 'info', null, userMessage.emailNotExist);
        }

        // Add 120 minutes to the current time
        let tokenObj = {
            tokenExpiry: Date.now() + (120 * 60 * 1000),
            userId: userData._id
        }
        let encryptToken = commonHelper.encryptData(tokenObj, process.env.CRYPTO_SECRET)

        const filter = { _id: new ObjectId(userData._id) };
        const updateDoc = {
            $set: {
                resetPasswordToken: encryptToken
            }
        };
        const options = { returnOriginal: false };
        if (userType == 'patient') {
            await Patient.findOneAndUpdate(filter, updateDoc, options);
        } else {
            await User.findOneAndUpdate(filter, updateDoc, options);
        }
        // Send email
        let link = '';
        if (userType == 'patient') {
            link = `${process.env.BASE_URL}/reset-password?token=${encryptToken}`;
        } else {
            link = `${process.env.BASE_URL}/admin/reset-password?token=${encryptToken}`;
        }
        triggerEmail.resetPassword('resetPassword', userData, link)

        commonHelper.sendResponse(res, 'success', null, userMessage.resetPassLink);
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};


const checkForgotPasswordTokenExpiry = async (req, res) => {
    try {
        const { token, userType } = req.query
        let decryptTokenData = commonHelper.decryptData(token, process.env.CRYPTO_SECRET)
        if (decryptTokenData && decryptTokenData != null) {
            let userData = '';
            if (userType == 'patient') {
                userData = await Patient.findOne({ _id: decryptTokenData.userId });
            } else {
                userData = await User.findOne({ _id: decryptTokenData.userId });
            }

            if (!userData && userData == null) return commonHelper.sendResponse(res, 'info', null, userMessage.userNotFound)
            if (!userData.resetPasswordToken) return commonHelper.sendResponse(res, 'info', null, infoMessage.linkInvalid)

            if (Date.now() > decryptTokenData.tokenExpiry) {
                commonHelper.sendResponse(res, 'info', null, infoMessage.linkExpired)
            } else {
                commonHelper.sendResponse(res, 'success', null, infoMessage.linkValid);
            }
        }
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, infoMessage.linkInvalid);
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, password, userType } = req.body

        let decryptTokenData = commonHelper.decryptData(token, process.env.CRYPTO_SECRET)
        let userData = '';

        if (userType == 'patient') {
            userData = await Patient.findOne({ _id: decryptTokenData.userId });
        } else {
            userData = await User.findOne({ _id: decryptTokenData.userId });
        }

        if (!userData && userData == null) return commonHelper.sendResponse(res, 'info', null, userMessage.userNotFound)

        // Hash and salt the password
        let salt = await bcrypt.genSalt(10);
        const filter = { _id: userData._id };
        const updateDoc = {
            $set: {
                salt: salt,
                hash_password: await bcrypt.hash(password, salt),
                resetPasswordToken: ""
            }
        };
        // Specify options for the update operation (e.g., return the updated document)
        const options = { returnOriginal: false };
        let updatedUser = '';
        if (userType == 'patient') {
            updatedUser = await Patient.findOneAndUpdate(filter, updateDoc, options);
        } else {
            updatedUser = await User.findOneAndUpdate(filter, updateDoc, options);
        }
        commonHelper.sendResponse(res, 'success', updatedUser, infoMessage.passwordReset);

    } catch (error) {
        console.log("error>>>>>>", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const logout = async (req, res) => {
    try {
        let userId = req.body._id;
        let userType = req.body.userType;
        let userData = ''; let loginCount = 0;
        if (userType == 'patient') {
            userData = await userCommonHelper.patientGetById(userId)
            loginCount = userData.loginCount > 0 ? userData.loginCount - 1 : 0
            await Patient.findOneAndUpdate({ _id: userId }, { $set: { loginCount: loginCount } })
        } else {
            userData = await userCommonHelper.userGetById(userId)
            loginCount = userData.loginCount > 0 ? userData.loginCount - 1 : 0
            await User.findOneAndUpdate({ _id: userId }, { $set: { loginCount: loginCount } })
        }
        commonHelper.sendResponse(res, 'success', userId, 'logout');
    } catch (error) {
        console.log("========error=========", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};


const patientLogin = async (req, res) => {
    try {
        const { email } = req.body;
        let userData = await userCommonHelper.patientGetByEmail(email)
        let loginCount = userData.loginCount + 1
        if (loginCount > 200) {
            commonHelper.sendResponse(res, 'error', null, userMessage.loginCounterMessage);
        } else {
            await Patient.findOneAndUpdate({ email: email }, { $set: { failedAttempts: 0, loginCount: loginCount } })
            const token = jwt.sign({ _id: userData._id }, process.env.SECRET, { expiresIn: '1d' });
            let returnData = {
                _id: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                role: 'patient',
                token: token,
                loginCount: loginCount,
                profileImage: userData.profileImage,

                middleName: userData.middleName,
                dob: userData.dob,
                maritalStatus: userData.maritalStatus,
                gender: userData.gender,
                phoneNumber: userData.phoneNumber,
                cellPhoneNumber: userData.cellPhoneNumber,
                workExtensionNumber: userData.workExtensionNumber
            };
            commonHelper.sendResponse(res, 'success', returnData, commonMessage.login);
        }
    } catch (error) {
        console.log("error>>>", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};

module.exports = {
    userLogin,
    forgotPassword,
    checkForgotPasswordTokenExpiry,
    resetPassword,
    patientLogin,
    logout
};