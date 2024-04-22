require('dotenv').config();
const { userMessage, commonMessage, infoMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const userCommonHelper = require('../helpers/userCommon');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const ResetPasswordToken = require('../models/resetPasswordTokenModel');
const User = require('../models/userModel');
let ObjectId = require('mongoose').Types.ObjectId;
const triggerEmail = require('../helpers/triggerEmail');

const userLogin = async (req, res) => {
    try {
        const { email } = req.body;
        let userData = await userCommonHelper.userGetByEmail(email)

        // Reset failed attempts on successful login
        await User.findOneAndUpdate( { email },{ $set: { failedAttempts: 0 } });

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

        let token = await ResetPasswordToken.findOne({ userId: new ObjectId(userData._id) });
        // Add 180 minutes to the current time
        let tokenExpiry = Date.now() + (180 * 60 * 1000)
        if (!token) {
            token = await new ResetPasswordToken({
                userId: userData._id,
                token: commonHelper.generateToken(55),
                expires:tokenExpiry
            }).save();
        }else{
            const tokenExpire = await ResetPasswordToken.findOne({ userId: new ObjectId(userData._id), token: token, expires:{ $gte: Date.now() } });
            if(!tokenExpire || tokenExpire==null){
                const filter = { userId: new ObjectId(userData._id) };
                const updateDoc = {
                    $set: {
                        token: commonHelper.generateToken(55),
                        expires:tokenExpiry
                    }
                };
                const options = { returnOriginal: false };
                await ResetPasswordToken.findOneAndUpdate(filter, updateDoc, options);
            }
        }

        let updatedTokenData = await ResetPasswordToken.findOne({ userId: new ObjectId(userData._id) });

        // Send email
        const link = `${process.env.BASE_URL}/reset-password/${userData._id}/${updatedTokenData.token}`;
        console.log("link>>>>",link)
        triggerEmail.invitePracticeAdminEmail(email,link)

        commonHelper.sendResponse(res, 'success', null , userMessage.resetPassLink);
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};


const checkForgotPasswordTokenExpiry = async (req, res) => {
    try {
        const { token, userId } = req.params
        const tokenData = await ResetPasswordToken.findOne({ userId: new ObjectId(userId)});
        console.log("tokenData1>>>",tokenData)
        if(!tokenData && tokenData==null) return commonHelper.sendResponse(res, 'info', null, infoMessage.linkInvalid)

        const tokenExpire = await ResetPasswordToken.findOne({ userId: new ObjectId(userId), token: token, expires:{ $gte: Date.now() } });
        
        console.log("tokenData2>>>",tokenExpire)
        if(!tokenExpire || tokenExpire==null){
            commonHelper.sendResponse(res, 'info', null, infoMessage.linkExpired)
        }else{
            commonHelper.sendResponse(res, 'success', null , infoMessage.linkValid);  
        }
    } catch (error) {
        console.log("error>>>",error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};

const resetPassword = async (req, res) => {
    try {
        const { userId, password } = req.body
        const userData = await User.findOne({ _id: userId});
        console.log("userData>>>",userData)
        if(!userData && userData==null) return commonHelper.sendResponse(res, 'info', null, userMessage.userNotFound)

        // Delete token doc
        await ResetPasswordToken.findOneAndDelete({ userId: new ObjectId(userId) });
        
        // Hash and salt the password
        let salt = await bcrypt.genSalt(10);
        const filter = { _id: userId };
        const updateDoc = {
            $set: {
                salt:salt,
                hash_password: await bcrypt.hash(password, salt)
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