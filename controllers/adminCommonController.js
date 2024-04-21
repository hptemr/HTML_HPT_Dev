const User = require('../models/userModel');
const { userMessage, commonMessage, infoMessage } = require('../helpers/message');
const userCommonHelper = require('../helpers/userCommon');
const commonHelper = require('../helpers/common');
require('dotenv').config();
const bcrypt = require('bcrypt')
let ObjectId = require('mongoose').Types.ObjectId;

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
      const updatedUser = await User.findOneAndUpdate(filter, updateDoc, options);
      commonHelper.sendResponse(res, 'success', null, infoMessage.passwordChange);
    } catch (error) {
      console.log("changePassword error>>>>",error)
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  };


module.exports = {
    changePassword
};