require('dotenv').config();
const { userMessage, commonMessage, infoMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const userCommonHelper = require('../helpers/userCommon');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const ResetPasswordToken = require('../models/resetPasswordTokenModel');
const User = require('../models/userModel');
const PatientTemp = require('../models/patientTempModel');
const Patient = require('../models/patientModel');
let ObjectId = require('mongoose').Types.ObjectId;
const triggerEmail = require('../helpers/triggerEmail');

const signup = async (req, res) => {
    try {
        const { query,data } = req.body;
        console.log('query>>>',query)
        console.log(data.email,'data>>>',data)
    
        let alreadyPatient = await Patient.findOne({ email: data.email });
        let found = await PatientTemp.findOne({ _id: query._id });
        console.log('alreadyPatient >>>',alreadyPatient,'   found>>>',found)

        if(found){

        }else{
            let newPatient = new PatientTemp(data);
            const result = await newPatient.save();
        }




        // let userData = await userCommonHelper.userGetByEmail(email)

        // // Reset failed attempts on successful login
        // await User.findOneAndUpdate( { email : email, failedAttempts: { $gt: 0 } },{ $set: { failedAttempts: 0 } });

        // const token = jwt.sign({ _id: userData._id }, process.env.SECRET, { expiresIn: '1d' });
        // let returnData ={ 
        //     _id:userData._id,
        //     firstName: userData.firstName,
        //     lastName: userData.lastName,  
        //     email: userData.email, 
        //     role: userData.role, 
        //     token :token
        // };
         commonHelper.sendResponse(res, 'success', result, commonMessage.login);
    } catch (error) {
        console.log('query>>>',error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};


module.exports = {
    signup
   
};