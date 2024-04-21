const User = require('../models/userModel');
const { userMessage, commonMessage } = require('../helpers/message');
const userCommonHelper = require('../helpers/userCommon');
const commonHelper = require('../helpers/common');
let ObjectId = require('mongoose').Types.ObjectId;
const userInviteToken = require('../models/userInviteTokenModel');
require('dotenv').config();
const triggerEmail = require('../helpers/triggerEmail');

const invite = async (req, res, next) => {
    try {
      const { email, practiceLocation } = req.body;
      let userData = await userCommonHelper.userGetByEmail(email)
      if(userData){
        return commonHelper.sendResponse(res, 'info', null, userMessage.emailExist);
      }

      // Get role
      const roleData = await userCommonHelper.roleByCode('PA'); // PA means Practice Admin
      
      // Save user
      let newUser = new User(req.body);
      newUser.practiceLocation = [practiceLocation]
      newUser.invitedBy = req.userId
      newUser.role = (roleData!=null && roleData.role)?roleData.role:''
      const result = await newUser.save();
      if(result && result!=null){
        // Save token for user sign up
        const setTokenData = await new userInviteToken({
            userId: result._id,
            token: commonHelper.generateToken(55)
        }).save();

        // Send email
        const link = `${process.env.BASE_URL}/practice-admin/signup/${result._id}/${setTokenData.token}`;
        console.log("link>>>>",link)
        triggerEmail.invitePracticeAdminEmail(email,link)

        commonHelper.sendResponse(res, 'success', result, `Practice admin ${userMessage.inviteSuccess}`);
      }  
    } catch (error) {
      console.log("error>>>",error)
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};


const getPracticeAdminUsers = async (req, res, next) => {
  try {
    let searchQuery =  req.query.searchQuery
    const filter = {
      $or: [
          { firstName: { $regex: searchQuery, $options: 'i' } },
          { lastName: { $regex: searchQuery, $options: 'i' } },
          { status: searchQuery },
          { practiceLocation: searchQuery }
      ],
      role: 'practice_admin'
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
    let _id = req.params.userId
    let projection = {firstName:1,lastName:1,email:1,phoneNumber:1,status:1,practiceLocation:1}
    const result = await User.findOne({ _id },projection);
    commonHelper.sendResponse(res, 'success', result, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { userId, clickAction } = req.body
    const filter = { _id: new ObjectId(userId) };
    req.body.updatedAt = Date.now()
    const updateDoc = {
        $set: req.body
    };
    const options = { returnOriginal: false };
    await User.findOneAndUpdate(filter, updateDoc, options);
    
    let successMessage = (clickAction=='update') ? commonMessage.profileUpdate : (clickAction=='delete') ? commonMessage.profileDelete :''
    commonHelper.sendResponse(res, 'success', null, successMessage);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};


module.exports = {
    invite,
    getPracticeAdminUsers,
    profile,
    updateProfile
};