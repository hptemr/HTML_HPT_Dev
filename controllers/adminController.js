const User = require('../models/userModel');
const { userMessage, commonMessage, infoMessage } = require('../helpers/message');
const userCommonHelper = require('../helpers/userCommon');
const commonHelper = require('../helpers/common');
require('dotenv').config();
const bcrypt = require('bcrypt')
let ObjectId = require('mongoose').Types.ObjectId;
const triggerEmail = require('../helpers/triggerEmail');
const s3 = require('./../helpers/s3Upload')
var constants = require('./../config/constants')
const s3Details = constants.s3Details;

const systemAdminSignUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let userData = await userCommonHelper.userGetByEmail(email)
    if (userData) {
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
    console.log("error>>>", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};


const invite = async (req, res, next) => {
  try {
    const { email, practiceLocation, userRole } = req.body;
    let userData = await userCommonHelper.userGetByEmail(email)
    if (userData) {
      return commonHelper.sendResponse(res, 'info', null, userMessage.emailAlreadyRegister);
    }

    // Save user
    let newUser = new User(req.body);
    newUser.practiceLocation = [practiceLocation]
    newUser.invitedBy = req.userId // Login user id
    newUser.role = userRole
    const result = await newUser.save();

    if (result && result != null) {
      let encryptObj = { userId: result._id }
      let inviteEncryptedToken = commonHelper.encryptData(encryptObj, process.env.CRYPTO_SECRET)
      // Update invite token
      await User.findOneAndUpdate({ _id: result._id }, { inviteToken: inviteEncryptedToken });

      // Send email
      const link = `${process.env.BASE_URL}/admin/signup/${inviteEncryptedToken}`;
      triggerEmail.inviteAdmin('inviteAdmin', result, link)

      commonHelper.sendResponse(res, 'success', result, userMessage.inviteSuccess);
    }
  } catch (error) {
    console.log("error>>>", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};


const changePassword = async (req, res, next) => {
  try {
    const _id = req.body.userId
    const { confirmPassword } = req.body;
    let userData = await userCommonHelper.userGetById(_id)
    if (bcrypt.compareSync(confirmPassword, userData.hash_password)) {
      return commonHelper.sendResponse(res, 'info', null, userMessage.enterCurrentPassword);
    }

    // Hash and salt the password
    let salt = await bcrypt.genSalt(10);
    const filter = { _id: _id };
    const updateDoc = {
      $set: {
        salt: salt,
        hash_password: await bcrypt.hash(confirmPassword, salt)
      }
    };
    const options = { returnOriginal: false };
    await User.findOneAndUpdate(filter, updateDoc, options);
    commonHelper.sendResponse(res, 'success', null, infoMessage.passwordChange);
  } catch (error) {
    console.log("changePassword error>>>>", error)
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
    const { userId, clickAction, status, email } = req.body
    let userData = await userCommonHelper.userGetById(userId)
    let emailExists = await User.findOne({ email: email, _id: {$ne: userId}});
    // Check if the new email already exists in the database
    if (emailExists) {
        return commonHelper.sendResponse(res, 'info', null, userMessage.emailExist);
    }

    // Active bloked user
    if(clickAction=='update' && status=='Active' && userData.status=='Blocked'){
      const randomPassword = await commonHelper.generateRandomPassword()
      // Update random password
      let salt = await bcrypt.genSalt(10);
      req.body.salt = salt
      req.body.hash_password = await bcrypt.hash(randomPassword, salt)
      req.body.failedAttempts = 0
      // Email 
      triggerEmail.unblockUser('unblockUser',userData, randomPassword)
    }

    // Update profile
    const filter = { _id: new ObjectId(userId) };
    req.body.updatedAt = Date.now()
    const updateDoc = {
        $set: req.body
    };
    const options = { returnOriginal: false };
    let updateProfileData=await User.findOneAndUpdate(filter, updateDoc, options);
    
    let successMessage = (clickAction=='update') ? commonMessage.profileUpdate : 
    (clickAction=='delete') ? commonMessage.profileDelete :''
    commonHelper.sendResponse(res, 'success', updateProfileData, successMessage);
  } catch (error) {
    console.log("error>>>",error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};


const updateUser = async (req, res) => {
  try {
    const { query, updateInfo } = req.body
    
    if (req.body.passwordReset != undefined && req.body.passwordReset == true) {
      let decryptTokenData = commonHelper.decryptData(query._id, process.env.CRYPTO_SECRET)
      query._id = decryptTokenData.userId

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
      let decryptTokenData = commonHelper.decryptData(query._id, process.env.CRYPTO_SECRET)
      query._id = decryptTokenData.userId
    }
    const result = await User.findOne(query, params);
    commonHelper.sendResponse(res, 'success', result, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getUserList = async (req, res) => {
  try {
    const { query, fields, order, offset, limit } = req.body;
    let userList = await User.find(query, fields).sort(order).skip(offset).limit(limit);
    let totalCount = await User.find(query).count()
    commonHelper.sendResponse(res, 'success', { userList, totalCount }, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getTherapistList = async (req, res) => {
  try {
    const { query, fields, order } = req.body;
    let therapist_data = await User.find(query, fields).sort(order);
    let totalCount = await User.find(query).count()
    let therapistData = [];
    therapist_data.forEach(element => {
      let newValue = {id:element._id,name:element.firstName+' '+element.lastName};
      therapistData.push(newValue);
    });

    commonHelper.sendResponse(res, 'success', { therapistData, totalCount }, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


const getLocationWiseUserList = async (req, res) => {
  try {
    const { query, fields, order, offset, limit } = req.body;
    let userList = await User.find(query, fields).sort(order).skip(offset).limit(limit);
    let totalCount = await User.find(query).count()
    commonHelper.sendResponse(res, 'success', { userList, totalCount }, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


const deleteProfileImage = async (req, res) => {
  try {
    const { userId } = req.body
    await s3.deleteFile(s3Details.profileImageFolderPath, userId + '.png')
    await User.findOneAndUpdate({ _id: userId }, { profileImage: s3Details.defaultProfileImageName });
    commonHelper.sendResponse(res, 'success', s3Details.defaultProfileImageName, userMessage.profileImageRemoved);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


changeProfileImage = async (req, res) => {
  try {
    const { userId, profileImage } = req.body
    var profileImagePath = constants.s3Details.profileImageFolderPath;
    var params = {
      ContentEncoding: "base64",
      ACL: "public-read-write",
      Bucket: constants.s3Details.bucketName,
    }
    const ext = 'png'
    const filename = userId + `.${ext}`;
    const fileBuffer = new Buffer(profileImage.replace(/^data:image\/\w+;base64,/, ""), "base64");
    Object.assign(params, {
      ContentType: `image/${ext}`,
      Key: `${profileImagePath}${filename}`,
      Body: fileBuffer,
    })

    let deleteParams = {
      bucketName: constants.s3Details.bucketName,
      filePath: `${profileImagePath}${filename}`
    }
    await s3.deleteObjectNew(deleteParams)

    let s3Status = await s3.uploadFileNew(params)
    if (s3Status) {
      await User.updateOne({ _id: userId }, { profileImage: filename });
      commonHelper.sendResponse(res, 'success', filename , userMessage.profileImageChanged);
    } else {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  } catch (error) {
    console.log("*******error******", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

module.exports = {
  invite,
  changePassword,
  profile,
  updateProfile,
  systemAdminSignUp,
  updateUser,
  getUserDetails,
  getUserList,
  getTherapistList,
  getLocationWiseUserList,
  deleteProfileImage,
  changeProfileImage
};