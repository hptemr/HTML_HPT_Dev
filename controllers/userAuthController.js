require('dotenv').config();
const { userMessage, commonMessage, infoMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const userCommonHelper = require('../helpers/userCommon');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const patientTemp = require('../models/patientTempModel');
const patient = require('../models/patientModel');
let ObjectId = require('mongoose').Types.ObjectId;
const triggerEmail = require('../helpers/triggerEmail');

const patientSignup = async (req, res) => {
    try {
        const { email } = req.body;
        let user_data = await userCommonHelper.userGetByEmail(email)

        // Reset failed attempts on successful login
       const patient_data = await patient.findOne({ email });
       
        await patientTemp.findOne( { email : email} );

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


module.exports = {
    patientSignup
};