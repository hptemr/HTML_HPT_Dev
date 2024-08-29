require('dotenv').config();
const commonHelper = require('../helpers/common');
const userCommonHelper = require('../helpers/userCommon');
const { userMessage, commonMessage } = require('../helpers/message');
const bcrypt = require('bcrypt')
const User = require('../models/userModel');
const Patient = require('../models/patientModel');

const checkLoginValidation = async (req, res, next) =>{
    try {
        const { email, password } = req.body;
        let userData = await userCommonHelper.userGetByEmail(email)
        let inactiveStatus = ['Pending','Deleted']
        if(userData==null || !userData){
            return commonHelper.sendResponse(res, 'unauthorized', null, userMessage.invalidCredentials);
        }else if (inactiveStatus.includes(userData.status)){
            return commonHelper.sendResponse(res, 'info', null, userMessage.inactiveUser);
        } else if (userData.status == 'Suspended'){
            return commonHelper.sendResponse(res, 'info', null, userMessage.suspendedAccount);
        }else if (userData.status == 'Blocked'){
            return commonHelper.sendResponse(res, 'info', null, userMessage.userBlocked);
        }else if (!bcrypt.compareSync(password, userData.hash_password)){
            // Increment failed attempts (Not for System Admin)
            if(userData.role!='system_admin'){
                await User.findOneAndUpdate({ email },{ $inc: { failedAttempts: 1 } },{ new: true });
                if (userData.failedAttempts+1 > 3) {
                    await User.findOneAndUpdate({ email },{ $set: { status: 'Blocked' } });
                    return commonHelper.sendResponse(res, 'info', null, userMessage.userBlocked);
                }
            }

            return commonHelper.sendResponse(res, 'unauthorized', null, userMessage.invalidCredentials);
        }
        next();
    } catch (error) {
        console.log("checkLoginValidation>>>>",error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
 };


 const checkPatientLoginValidation = async (req, res, next) =>{
    try {
        const { email, password } = req.body;
        let userData = await userCommonHelper.patientGetByEmail(email)
        let inactiveStatus = ['Pending','Deleted']
        if(userData==null || !userData){
            return commonHelper.sendResponse(res, 'unauthorized', null, userMessage.invalidCredentials);
        }else if (inactiveStatus.includes(userData.status)){
            return commonHelper.sendResponse(res, 'info', null, userMessage.inactiveUser);
        } else if (userData.status == 'Suspended'){
            return commonHelper.sendResponse(res, 'info', null, userMessage.suspendedAccount);
        }else if (userData.status == 'Blocked'){
            return commonHelper.sendResponse(res, 'info', null, userMessage.userBlocked);
        }else if (!bcrypt.compareSync(password, userData.hash_password)){
            return commonHelper.sendResponse(res, 'unauthorized', null, userMessage.invalidCredentials);
        }
        next();
    } catch (error) {
        console.log("check Patient Login Validation>>>>",error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
 };

 const checkTherapistValidation = async (req, res, next) =>{
    try {
        const { userId, clickAction, NPI, phoneNumber, SSN, licenceNumber } = req.body;
        let userData = await userCommonHelper.userGetById(userId)
        if(userData!=null && userData.role=='therapist' && clickAction=='update'){
            // Check NPI Exist 
            const npiExists = await User.findOne({ NPI, _id: { $ne: userId } });
            if (npiExists) {
             return commonHelper.sendResponse(res, 'info', null, userMessage.npiExists);
            }

            // Check SSN Exist 
            const ssnExists  = await User.findOne({ SSN, _id: { $ne: userId } });
            if (ssnExists ) {
             return commonHelper.sendResponse(res, 'info', null, userMessage.ssnExists);
            }

            // Check Licence Exist 
            const licenseExists = await User.findOne({ licenceNumber, _id: { $ne: userId } });
            if (licenseExists) {
             return commonHelper.sendResponse(res, 'info', null, userMessage.licenseExists);
            }
        }
        next()
    } catch (error) {
        console.log("checkTherapistValidation>>>>",error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
 }

 module.exports = {
    checkLoginValidation,
    checkPatientLoginValidation,
    checkTherapistValidation
};