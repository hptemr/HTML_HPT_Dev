require('dotenv').config();
const commonHelper = require('../helpers/common');
const userCommonHelper = require('../helpers/userCommon');
const { userMessage, commonMessage } = require('../helpers/message');
const bcrypt = require('bcrypt')
const User = require('../models/userModel');

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


 module.exports = {
    checkLoginValidation
};