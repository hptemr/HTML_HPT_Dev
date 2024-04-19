const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const {userMessage, commonMessage, infoMessage } = require('../helpers/message');
const userCommonHelper = require('../helpers/userCommon');
const commonHelper = require('../helpers/common');
let ObjectId = require('mongoose').Types.ObjectId;

const signUp = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      let userData = await userCommonHelper.userGetByEmail(email)
      if(userData){
        return commonHelper.sendResponse(res, 'info', null, userMessage.emailExist);
      }

      const roleData = await userCommonHelper.roleByCode('SA'); // SA means System Admin
      let newUser = new User(req.body);
      // Hash and salt the password
      let salt = await bcrypt.genSalt(10);
      newUser.salt = salt
      newUser.hash_password = await bcrypt.hash(password, salt);
      newUser.role = (roleData!=null && roleData.role)?roleData.role:''

      const result = await newUser.save();
      commonHelper.sendResponse(res, 'success', result, `System admin ${commonMessage.created}`);
    } catch (error) {
      console.log("error>>>",error)
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};

const profile = async (req, res, next) => {
  try {
    let _id = req.userId
    const result = await User.findOne({ _id },{firstName:1,lastName:1,email:1});
    commonHelper.sendResponse(res, 'success', result, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const filter = { _id: new ObjectId(req.userId) };
    const updateDoc = {
        $set: req.body
    };
    const options = { returnOriginal: false };
    await User.findOneAndUpdate(filter, updateDoc, options);
    commonHelper.sendResponse(res, 'success', null, commonMessage.profileUpdate);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const _id = req.userId
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
    const updatedUser = await User.findOneAndUpdate(filter, updateDoc, options);
    commonHelper.sendResponse(res, 'success', null, infoMessage.passwordChange);
  } catch (error) {
    console.log("changePassword error>>>>",error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};

module.exports = {
  signUp,
  profile,
  updateProfile,
  changePassword
};