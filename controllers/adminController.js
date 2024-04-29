const User = require('../models/userModel');
const { userMessage, commonMessage, infoMessage } = require('../helpers/message');
const userCommonHelper = require('../helpers/userCommon');
const commonHelper = require('../helpers/common');
require('dotenv').config();
const bcrypt = require('bcrypt')
let ObjectId = require('mongoose').Types.ObjectId;
const triggerEmail = require('../helpers/triggerEmail');


const systemAdminSignUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let userData = await userCommonHelper.userGetByEmail(email)
    if(userData){
      return commonHelper.sendResponse(res, 'info', null, userMessage.emailExist);
    }
    
    let newUser = new User(req.body);
    // Hash and salt the password
    let salt = await bcrypt.genSalt(10);
    newUser.salt = salt
    newUser.hash_password = await bcrypt.hash(password, salt);
    newUser.role = 'system_admin'

    const result = await newUser.save();
    commonHelper.sendResponse(res, 'success', result, `System admin ${commonMessage.created}`);
  } catch (error) {
    console.log("error>>>",error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};


const invite = async (req, res, next) => {
  try {
    const { email, practiceLocation, userRole } = req.body;
    let userData = await userCommonHelper.userGetByEmail(email)
    if(userData){
      return commonHelper.sendResponse(res, 'info', null, userMessage.emailAlreadyRegister);
    }

    // Save user
    let newUser = new User(req.body);
    newUser.practiceLocation = [practiceLocation]
    newUser.invitedBy = req.userId // Login user id
    newUser.role = userRole
    const result = await newUser.save();

    if(result && result!=null){
      let encryptObj = { userId: result._id }
      let inviteEncryptedToken = commonHelper.encryptData(encryptObj, process.env.CRYPTO_SECRET)
      // Update invite token
      await User.findOneAndUpdate({_id :result._id},{inviteToken:inviteEncryptedToken});   

      // Send email
      const link = `${process.env.BASE_URL}/admin/signup/${inviteEncryptedToken}`;
      triggerEmail.invitePracticeAdminEmail(email,link)

      commonHelper.sendResponse(res, 'success', result, userMessage.inviteSuccess);
    }  
  } catch (error) {
    console.log("error>>>",error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};


const changePassword = async (req, res, next) => {
    try {
      const _id = req.body.userId
      const { currentPassword, confirmPassword } = req.body;
      let userData = await userCommonHelper.userGetById(_id)
      if(!bcrypt.compareSync(currentPassword, userData.hash_password)) {
        return commonHelper.sendResponse(res, 'info', null, userMessage.passwordNotMatch);
      } 
  
      // Hash and salt the password
      let salt = await bcrypt.genSalt(10);
      const filter = { _id: _id };
      const updateDoc = {
          $set: {
              salt:salt,
              hash_password: await bcrypt.hash(confirmPassword, salt)
          }
      };
      const options = { returnOriginal: false };
      await User.findOneAndUpdate(filter, updateDoc, options);
      commonHelper.sendResponse(res, 'success', null, infoMessage.passwordChange);
    } catch (error) {
      console.log("changePassword error>>>>",error)
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  };


  const getAdminUsers = async (req, res, next) => {
    try {
      let searchQuery =  req.query.searchQuery
      let userRole =  req.query.userRole
      const filter = {
        $or: [
            { firstName: { $regex: searchQuery, $options: 'i' } },
            { lastName: { $regex: searchQuery, $options: 'i' } },
            { email: searchQuery },
            { status: searchQuery },
            { practiceLocation: searchQuery }
        ],
        role: userRole
      };
  
      const practiceAdminData = await User.find(filter).lean();
      commonHelper.sendResponse(res, 'success', practiceAdminData, '');
    } catch (error) {
      console.log("error>>>",error)
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  };

  const profile = async (req, res, next) => {
    try {
      const { query, params } = req.body
      const result = await User.findOne(query, params);
      commonHelper.sendResponse(res, 'success', result, '');
    } catch (error) {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  };
  
  const updateProfile = async (req, res, next) => {
    try {
      const { userId, clickAction, status } = req.body
      
      let userData = await userCommonHelper.userGetById(userId)
      // Active bloked user
      if(clickAction=='update' && status=='Active' && userData.status=='Blocked'){
        const randomPassword = await commonHelper.generateRandomPassword()
        // Update random password
        let salt = await bcrypt.genSalt(10);
        req.body.salt = salt
        req.body.hash_password = await bcrypt.hash(randomPassword, salt)
        req.body.failedAttempts = 0
        // Email 
        triggerEmail.unblockUserEmail(userData.email,randomPassword)
      }

      // Update profile
      const filter = { _id: new ObjectId(userId) };
      req.body.updatedAt = Date.now()
      const updateDoc = {
          $set: req.body
      };
      const options = { returnOriginal: false };
      await User.findOneAndUpdate(filter, updateDoc, options);
      
      let successMessage = (clickAction=='update') ? commonMessage.profileUpdate : 
      (clickAction=='delete') ? commonMessage.profileDelete :''
      commonHelper.sendResponse(res, 'success', null, successMessage);
    } catch (error) {
      console.log("error>>>",error)
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  };


  const updateUser = async (req, res) => {
    try {
      const { query, updateInfo } = req.body
      if (req.body.passwordReset != undefined && req.body.passwordReset == true) {
        let salt = await bcrypt.genSalt(10)
        let password = await bcrypt.hash(updateInfo.password, salt)
        delete updateInfo.password
        Object.assign(updateInfo, { salt: salt, hash_password: password })
      }
      let user = await User.findOneAndUpdate(query, updateInfo)
      commonHelper.sendResponse(res, 'success', user, commonMessage.profileUpdate);
    } catch (error) {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  }
  
  const getUserDetails = async (req, res, next) => {
    try {
      const { query, params } = req.body
      if (req.body.decryptUserId != undefined && req.body.decryptUserId != '') {
  
      }
      const result = await User.findOne(query, params);
      commonHelper.sendResponse(res, 'success', result, '');
    } catch (error) {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  }
  


module.exports = {
    invite,
    changePassword,
    getAdminUsers,
    profile,
    updateProfile,
    systemAdminSignUp,
    updateUser,
    getUserDetails
};