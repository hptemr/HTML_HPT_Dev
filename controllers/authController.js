require('dotenv').config();
const { userMessage, commonMessage, infoMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const userCommonHelper = require('../helpers/userCommon');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
let ObjectId = require('mongoose').Types.ObjectId;
const triggerEmail = require('../helpers/triggerEmail');

const userLogin = async (req, res) => {
    try {
        const { email } = req.body;
        let userData = await userCommonHelper.userGetByEmail(email)

        // Reset failed attempts on successful login
        await User.findOneAndUpdate( { email : email, failedAttempts: { $gt: 0 } },{ $set: { failedAttempts: 0 } });

        const token = jwt.sign({ _id: userData._id }, process.env.SECRET, { expiresIn: '1d' });
        let returnData ={ 
            _id:userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,  
            email: userData.email, 
            role: userData.role, 
            token :token
        };
        commonHelper.sendResponse(res, 'success', returnData, commonMessage.login);
    } catch (error) {
        console.log("error>>>",error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        let userData = await userCommonHelper.userGetByEmail(email)
        if (!userData){
            return commonHelper.sendResponse(res, 'info', null, userMessage.emailNotExist);
        }    

        // Add 120 minutes to the current time
        let tokenObj = {
            tokenExpiry : Date.now() + (120 * 60 * 1000),
            userId :userData._id
        }
        let encryptToken = commonHelper.encryptData(tokenObj,process.env.CRYPTO_SECRET)

        const filter = { _id: new ObjectId(userData._id) };
        const updateDoc = {
            $set: {
                resetPasswordToken: encryptToken
            }
        };
        const options = { returnOriginal: false };
        await User.findOneAndUpdate(filter, updateDoc, options);

        // Send email
        const link = `${process.env.BASE_URL}/reset-password?token=${encryptToken}`;
        triggerEmail.invitePracticeAdminEmail(email,link)

        commonHelper.sendResponse(res, 'success', null , userMessage.resetPassLink);
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};

const checkForgotPasswordTokenExpiry = async (req, res) => {
    try {
        const { token } = req.query
        let decryptTokenData = commonHelper.decryptData(token,process.env.CRYPTO_SECRET)
        if(decryptTokenData && decryptTokenData!=null){
            const userData = await User.findOne({ _id: decryptTokenData.userId});
            if(!userData && userData==null) return commonHelper.sendResponse(res, 'info', null, userMessage.userNotFound)
            if(!userData.resetPasswordToken) return commonHelper.sendResponse(res, 'info', null, infoMessage.linkInvalid)

            if(Date.now() > decryptTokenData.tokenExpiry){
                commonHelper.sendResponse(res, 'info', null, infoMessage.linkExpired)
            }else{
                commonHelper.sendResponse(res, 'success', null , infoMessage.linkValid);
            }
        }
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, infoMessage.linkInvalid);
    }
};

const resetPassword = async (req, res) => {
    try {
        // const { userId, password } = req.body
        const {  token, password } = req.body
        let decryptTokenData = commonHelper.decryptData(token,process.env.CRYPTO_SECRET)
        const userData = await User.findOne({ _id: decryptTokenData.userId});
        if(!userData && userData==null) return commonHelper.sendResponse(res, 'info', null, userMessage.userNotFound)

        // Hash and salt the password
        let salt = await bcrypt.genSalt(10);
        const filter = { _id: userId };
        const updateDoc = {
            $set: {
                salt:salt,
                hash_password: await bcrypt.hash(password, salt),
                resetPasswordToken:""
            }
        };
        // Specify options for the update operation (e.g., return the updated document)
        const options = { returnOriginal: false };
        const updatedUser = await User.findOneAndUpdate(filter, updateDoc, options);
        commonHelper.sendResponse(res, 'success', updatedUser, infoMessage.passwordReset);
        
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};

module.exports = {
    userLogin,
    forgotPassword,
    checkForgotPasswordTokenExpiry,
    resetPassword
};