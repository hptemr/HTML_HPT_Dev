const User = require('../models/userModel');
const { userMessage, commonMessage, infoMessage, documentMessage, billingMessage } = require('../helpers/message');
const userCommonHelper = require('../helpers/userCommon');
const commonHelper = require('../helpers/common');
require('dotenv').config();
const bcrypt = require('bcrypt')
let ObjectId = require('mongoose').Types.ObjectId;
const triggerEmail = require('../helpers/triggerEmail');
const s3 = require('./../helpers/s3Upload')
var constants = require('./../config/constants')
const s3Details = constants.s3Details;
const jwt = require('jsonwebtoken');
const Directory = require('../models/documentDirectoryModel');
const File = require('../models/documentFilesModel');
var fs = require('fs')
const cometChatLogModel = require('../models/cometChatLog');
const fetch = require('node-fetch');
const csv = require('csv-parser');
const Provider = require('../models/providerModel');
const ProviderLogs = require('../models/providerLogsModel');
const UploadInsurancesLogs = require('../models/uploadInsurancesLogsModel');
const UploadInsurances = require('../models/uploadInsurancesModel');
const Appointment = require('../models/appointmentModel');
const moment = require('moment');
let path = require('path')

const systemAdminSignUp = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    // Validate each field
    if (!userCommonHelper.validateName(firstName)) {
      return res.status(400).json({ error: "First name must only contain letters and be between 2 and 50 characters long." });
    }

    if (!userCommonHelper.validateName(lastName)) {
      return res.status(400).json({ error: "Last name must only contain letters and be between 2 and 50 characters long." });
    }

    if (!userCommonHelper.validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    if (!userCommonHelper.validatePassword(password)) {
      return res.status(400).json({ error: "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character." });
    }

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
    newUser.status = 'Active'
    newUser.firstName = firstName
    newUser.lastName = lastName

    const result = await newUser.save();

    // Create in comet chat
    let fullName = `${firstName} ${lastName}`;
    createSystemAdminInCometChat(fullName, result._id)

    commonHelper.sendResponse(res, 'success', result, `System admin ${commonMessage.created}`);
  } catch (error) {
    console.log("error>>>", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};

// Create System Admin in comet chat
const createSystemAdminInCometChat = async (fullName, uid) => {
  try {
    const url = `https://${constants.cometChatAppId}.api-us.cometchat.io/v3/users`;
    const options = {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json', apikey: constants.cometChatApikey },
      body: JSON.stringify({
        uid: uid,
        name: fullName,
        role: 'system_admin'
      })
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log("System admin created in comet chat : ", json))
      .catch(err => console.log('URL call error: ' + err));

  } catch (error) {
    console.log("createSystemAdminInCometChat error>>>", error)
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
      let encryptObj = { userId: result._id, tokenExpiry: Date.now() + (constants.inviteTokenExpiry * 60 * 1000) }
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
    if(result && result.role=='therapist' && result.therapistSignature!=''){
      result.therapistSignature = constants.s3Details.url+constants.s3Details.therapistFolderPath + result.therapistSignature
      //let previewUrl = await s3.previewDocumentFile(key);
      //if(previewUrl)result.therapistSignature = previewUrl;
    }
    commonHelper.sendResponse(res, 'success', result, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { userId, clickAction, status, email } = req.body
    let userData = await userCommonHelper.userGetById(userId)
    let emailExists = await User.findOne({ email: email, _id: { $ne: userId } });
    // Check if the new email already exists in the database
    if (emailExists) {
      return commonHelper.sendResponse(res, 'info', null, userMessage.emailExist);
    }

    // Active bloked user
    if (clickAction == 'update' && status == 'Active' && userData.status == 'Blocked') {
      const randomPassword = await commonHelper.generateRandomPassword()
      // Update random password
      let salt = await bcrypt.genSalt(10);
      req.body.salt = salt
      req.body.hash_password = await bcrypt.hash(randomPassword, salt)
      req.body.failedAttempts = 0
      // Email 
      triggerEmail.unblockUser('unblockUser', userData, randomPassword)
    }

    // Update profile
    if(req.body.uploadedSignatureFile && req.body.uploadedSignatureFile[0]){
      let therapist = await User.findOne({_id: userId },{ therapistSignature: 1 });
      let therapistSignature = new Date().getTime()+'-'+req.body.uploadedSignatureFile[0].name;
      let therapistSignatures = await s3UploadTherapistSignature(req, res,therapistSignature,therapist.therapistSignature)
      if(therapistSignatures){
        req.body.therapistSignature = therapistSignature
      }
    }
    const filter = { _id: new ObjectId(userId) };
    req.body.updatedAt = Date.now()
    const updateDoc = {
      $set: req.body
    };
    const options = { returnOriginal: false };
    let updateProfileData = await User.findOneAndUpdate(filter, updateDoc, options);

    let successMessage = (clickAction == 'update') ? commonMessage.profileUpdate : (clickAction == 'delete') ? commonMessage.profileDelete : ''
    commonHelper.sendResponse(res, 'success', updateProfileData, successMessage);
  } catch (error) {
    console.log("error>>>", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};


//work in process
const updateSignature = async (req, res, next) => {
  try {
    let previewUrl = '';
    const userId = req.body.userId;
    if(req.body.uploadedSignatureFile && req.body.uploadedSignatureFile[0]){
      let therapist = await User.findOne({_id: userId },{ therapistSignature: 1 });
      let therapistSignature = new Date().getTime()+'-'+req.body.uploadedSignatureFile[0].name;
      let therapistSignatures = await s3UploadTherapistSignature(req, res,therapistSignature,therapist.therapistSignature)

      if(therapistSignatures){
          req.body.therapistSignature = therapistSignature
   
          const filter = { _id: new ObjectId(userId) };
          req.body.updatedAt = Date.now()
          const updateDoc = {
            $set: req.body
          };
          const options = { returnOriginal: false };
          await User.findOneAndUpdate(filter, updateDoc, options);

          if(therapistSignature!=''){
            let key = constants.s3Details.therapistFolderPath + therapistSignature;
            previewUrl = await s3.previewDocumentFile(key);       
          }
      }
    }
    commonHelper.sendResponse(res, 'success', previewUrl, '');
  } catch (error) {
    console.log("error updateSignature >>>", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
};

async function s3UploadTherapistSignature(req, res,fileName,oldfile) {
  var s3SignaturePath = constants.s3Details.therapistFolderPath;
    console.log(' Old File>>>>>',oldfile,' File Name>>>',fileName)
    let uploadedSignatureFile = req.body.uploadedSignatureFile[0];
    if (uploadedSignatureFile) {
          if (uploadedSignatureFile.data && uploadedSignatureFile.data != '') {
              let fileSelected = uploadedSignatureFile.data
              const fileBuffer = Buffer.from(fileSelected.replace(fileSelected.split(",")[0], ""), "base64");
              //let fileBuffer = new Buffer(fileSelected.replace(fileSelected.split(",")[0], ""), "base64");
              let params = {
                  ContentEncoding: "base64",
                  //ACL: "bucket-owner-full-control",
                  ACL: 'public-read',
                  ContentType: fileSelected.split(";")[0],
                  Bucket: constants.s3Details.bucketName,
                  Body: fileBuffer,
                  Key: `${s3SignaturePath}${fileName}`,
              };
              await s3.uploadFileNew(params)

              // var s3DocumentPath = constants.s3Details.therapistFolderPath + "/";
              // await s3.uploadDocumentToS3(fileName, s3DocumentPath)

              if (oldfile) {
                await s3.deleteFile(s3SignaturePath + oldfile);
              }
          }
    }
  return fileName;
}

function isExtension(ext, extnArray) {
  var result = false;
  var i;
  if (ext) {
      ext = ext.toLowerCase();
      for (i = 0; i < extnArray.length; i++) {
          if (extnArray[i].toLowerCase() === ext) {
              result = true;
              break;
          }
      }
  }
  return result;
}

const updateUser = async (req, res) => {
  try {
    const { query, updateInfo } = req.body

    if (req.body.passwordReset != undefined && req.body.passwordReset == true) {
      let decryptTokenData = commonHelper.decryptData(query._id, process.env.CRYPTO_SECRET)

      // Check if Sign Up User account is deleted
      let userStatus = ['Deleted']
      let bodyInviteToken = query._id
      let userData = await userCommonHelper.userGetById(decryptTokenData.userId)
      if (!userData || userData == null) {
        return commonHelper.sendResponse(res, 'info', null, userMessage.userNotFound);
      } else if (userData != null && (!userData.inviteToken || userData.inviteToken != bodyInviteToken)) {
        return commonHelper.sendResponse(res, 'info', null, infoMessage.linkInvalid)
      } else if (userStatus.includes(userData.status)) {
        return commonHelper.sendResponse(res, 'info', null, userMessage.deleteUser);
      }

      query._id = decryptTokenData.userId
      let salt = await bcrypt.genSalt(10)
      let password = await bcrypt.hash(updateInfo.password, salt)
      delete updateInfo.password
      Object.assign(updateInfo, { salt: salt, hash_password: password })
    }

    let user = await User.findOneAndUpdate(query, updateInfo, { new: true })
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1d' });
    const userObject = user.toObject();
    userObject['token'] = token
    commonHelper.sendResponse(res, 'success', userObject, commonMessage.profileUpdate);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getUserDetails = async (req, res, next) => {
  try {
    const { query, params } = req.body
    let bodyInviteToken = ""
    // Check Invite Token is expired
    if (req.body.decryptUserId != undefined && req.body.decryptUserId != '') {
      bodyInviteToken = query._id
      let decryptTokenData = commonHelper.decryptData(query._id, process.env.CRYPTO_SECRET)
      query._id = decryptTokenData.userId
      if (Date.now() > decryptTokenData.tokenExpiry) {
        return commonHelper.sendResponse(res, 'info', null, infoMessage.linkExpired)
      }
    }

    // Get user details
    const result = await User.findOne(query, params);

    // Check Invite Token blank and not same with db
    if (req.body.decryptUserId != undefined && req.body.decryptUserId != '') {
      if (result != null && (!result.inviteToken || result.inviteToken != bodyInviteToken)) {
        return commonHelper.sendResponse(res, 'info', null, infoMessage.linkInvalid)
      }
    }
    commonHelper.sendResponse(res, 'success', result, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getUserList = async (req, res) => {
  try {
    const { query, fields, order, offset, limit } = req.body;
    fields['inviteToken'] = 1
    let userList = await User.find(query, fields).sort(order).skip(offset).limit(limit).lean();
    userList = userList.map((user) => ({
      ...user,
      inviteTokenStatus: user.inviteToken ? checkTokenExpire(user.inviteToken) : "blank"
    }));

    let totalCount = await User.find(query).countDocuments()
    commonHelper.sendResponse(res, 'success', { userList, totalCount }, '');
  } catch (error) {
    console.log('error >>> ', error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const checkTokenExpire = (inviteToken) => {
  let decryptTokenData = commonHelper.decryptData(inviteToken, process.env.CRYPTO_SECRET)
  let inviteTokenStatus = (decryptTokenData.tokenExpiry && Date.now() > decryptTokenData.tokenExpiry) ? 'expired' : 'valid'
  return inviteTokenStatus
}

const getTherapistList = async (req, res) => {
  try {
    const { query, fields, order, limit, all } = req.body;
    let limitas = 100;
    if (limit) { limitas = limit; }

    let therapist_data = await User.find(query, fields).sort(order).limit(limitas);
    let totalCount = await User.find({status: "Active"}).countDocuments()
    let therapistData = [];
    therapist_data.forEach(element => {
      let newValue = { id: element._id, name: element.firstName + ' ' + element.lastName };
      therapistData.push(newValue);
    });

    let all_therapist_data = [];
    if(all){
      let therapist_all_data = await User.find({status: "Active"}, fields).sort(order);
      therapist_all_data.forEach(element => {
        let newValue = { id: element._id, name: element.firstName + ' ' + element.lastName };
        all_therapist_data.push(newValue);
      });
    }
    commonHelper.sendResponse(res, 'success', { therapistData,all_therapist_data, totalCount }, '');
  } catch (error) {
    console.log('*********** get Therapist List >>>>', error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


const getLocationWiseUserList = async (req, res) => {
  try {
    const { query, fields, order, offset, limit } = req.body;
    let userList = await User.find(query, fields).sort(order).skip(offset).limit(limit);
    let totalCount = await User.find(query).countDocuments()
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
    const { userId, profileImage, imageName } = req.body
    var profileImagePath = constants.s3Details.profileImageFolderPath;
    console.log('image Name>>>', imageName)
    var params = {
      ContentEncoding: "base64",
      ACL: "public-read-write",
      Bucket: constants.s3Details.bucketName,
    }
    const ext = 'png'
    const oldfilename = userId + `.${ext}`;
    const filename = imageName + `.${ext}`;
    const fileBuffer = new Buffer(profileImage.replace(/^data:image\/\w+;base64,/, ""), "base64");
    Object.assign(params, {
      ContentType: `image/${ext}`,
      Key: `${profileImagePath}${filename}`,
      Body: fileBuffer,
    })

    let deleteParams = {
      bucketName: constants.s3Details.bucketName,
      filePath: `${profileImagePath}${oldfilename}`
    }
    await s3.deleteObjectNew(deleteParams)

    let s3Status = await s3.uploadFileNew(params)
    if (s3Status) {
      await User.updateOne({ _id: userId }, { profileImage: filename });
      commonHelper.sendResponse(res, 'success', filename, userMessage.profileImageChanged);
    } else {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  } catch (error) {
    console.log("*******error******", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getDefaultDirectories = async (req, res) => {
  try {
    let queryParams = { is_deleted: false, "selected-directory.role_name": req.body.userRole }
    if (req.body.searchValue != "") {
      queryParams.directory_name = { '$regex': req.body.searchValue, '$options': "i" }
    }
    let directoryList = await Directory.aggregate([
      {
        "$lookup": {
          "from": "role_map_directories",
          "let": {
            id1: "$directory_name"
          },
          "pipeline": [
            {
              "$match": {
                $expr: {
                  $and: [
                    {
                      $eq: [
                        "$$id1",
                        "$directory_name"
                      ]
                    }
                  ]
                }
              }
            }
          ],
          "as": "selected-directory"
        }
      },
      {
        "$unwind": "$selected-directory"
      },
      {
        $match: queryParams
      }
    ])
    if (req.body.userRole == 'therapist') {
      let userData = await User.find({ _id: req.body.userId });
      if (userData[0]['siteLeaderForPracLocation'] && userData[0]['siteLeaderForPracLocation'] == 'Site Leader') {
        directoryList = directoryList
      } else {
        directoryList = directoryList.filter((item) => item.directory_name !==
          "Site Leaders");
      }
    }
    commonHelper.sendResponse(res, 'success', { directoryList }, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getDirectoryItems = async (req, res) => {
  try {
    let directoryDetails = await Directory.find({ _id: req.body.directory });
    if (directoryDetails.length > 0) {

      let query = { is_deleted: false, parent_directory_id: directoryDetails[0]._id }
      let fileQuery = { is_deleted: false, directory_id: directoryDetails[0]._id }
      if (req.body.searchValue != "") {
        query.directory_name = { '$regex': req.body.searchValue, '$options': "i" }
        fileQuery.file_name = { '$regex': req.body.searchValue, '$options': "i" }
      }
      let directoryList = await Directory.find(query).sort({ _id: -1 });
      let fileList = await File.find(fileQuery).sort({ _id: -1 });
      commonHelper.sendResponse(res, 'success', { directoryList, fileList }, '');
    } else {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  } catch (error) {
    console.log(error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getDefaultDirectoriesAndItems = async (req, res) => {
  try {

    let queryParams = { is_deleted: false, "selected-directory.role_name": req.body.userRole }
    if (req.body.searchValue != "") {
      queryParams.directory_name = { '$regex': req.body.searchValue, '$options': "i" }
    }
    let directoryList = await Directory.aggregate([
      {
        "$lookup": {
          "from": "role_map_directories",
          "let": {
            id1: "$directory_name"
          },
          "pipeline": [
            {
              "$match": {
                $expr: {
                  $and: [
                    {
                      $eq: [
                        "$$id1",
                        "$directory_name"
                      ]
                    }
                  ]
                }
              }
            }
          ],
          "as": "selected-directory"
        }
      },
      {
        "$unwind": "$selected-directory"
      },
      {
        $match: queryParams
      }
    ])

    if (req.body.userRole == 'therapist') {
      let userData = await User.find({ _id: req.body.userId });
      if (userData[0]['siteLeaderForPracLocation'] && userData[0]['siteLeaderForPracLocation'] == 'Site Leader') {
        directoryList = directoryList
      } else {
        directoryList = directoryList.filter((item) => item.directory_name !==
          "Site Leaders");
      }

      let directoryItmList = ''; let fileListItem = ''; let fileList = [];
      let dir_cnt = directoryList.length;
      for (i = 0; i < dir_cnt; i++) {
        let directoryDetails = await Directory.find({ _id: directoryList[i]._id });
        if (directoryDetails.length > 0) {
          let query = { is_deleted: false, parent_directory_id: directoryDetails[0]._id }
          let fileQuery = { is_deleted: false, directory_id: directoryDetails[0]._id }
          if (req.body.searchValue != "") {
            query.directory_name = { '$regex': req.body.searchValue, '$options': "i" }
            fileQuery.file_name = { '$regex': req.body.searchValue, '$options': "i" }
          }
          // directoryItmList =  await Directory.find(query).sort({ _id: -1 });
          fileListItem = await File.find(fileQuery).sort({ _id: -1 });
          fileList.push(fileListItem);
        }
      }
      commonHelper.sendResponse(res, 'success', { directoryList, fileList }, '');

    } else {
      commonHelper.sendResponse(res, 'success', { directoryList, fileList }, '');
    }

  } catch (error) {
    console.log('Error >>>>', error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


const createDirectory = async (req, res) => {
  try {
    let directories = await Directory.find({ directory_name: req.body.directoryName, is_deleted: false })
    if (directories.length > 0) {
      commonHelper.sendResponse(res, 'error', null, "Directory" + documentMessage.exist);
    } else {
      let createParams = {
        directory_name: req.body.directoryName,
        parent_directory_id: new ObjectId(req.body.directoryId),
        is_deleted: false,
        create_at: new Date(),
        created_by: new ObjectId(req.body.endUserId),
      }
      await Directory.create(createParams)
      commonHelper.sendResponse(res, 'success', null, commonMessage.created);
    }
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const updateDirectory = async (req, res) => {
  try {
    let directories = await Directory.find({ directory_name: req.body.directoryName, is_deleted: false })
    if (directories.length > 0) {
      commonHelper.sendResponse(res, 'error', null, "Directory" + documentMessage.exist);
    } else {
      await Directory.updateOne({ _id: new ObjectId(req.body.directoryId) }, { directory_name: req.body.directoryName });
      commonHelper.sendResponse(res, 'success', null, documentMessage.directoryUpdated);
    }
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const removeDirectoryOrFile = async (req, res) => {
  try {
    if (req.body.sourceType == 'directory') {
      await Directory.updateOne({ _id: new ObjectId(req.body.removeItemId) }, { is_deleted: true });
      await Directory.updateMany({ parent_directory_id: new ObjectId(req.body.removeItemId) }, { is_deleted: true });
      await File.updateMany({ directory_id: new ObjectId(req.body.removeItemId) }, { is_deleted: true });
    } else {
      await File.updateOne({ _id: new ObjectId(req.body.removeItemId) }, { is_deleted: true });
    }
    commonHelper.sendResponse(res, 'success', {}, infoMessage.deleted);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const previewDocumentFile = async (req, res) => {
  let fileDetails = await File.find({ _id: new ObjectId(req.body.fileId) })
  let key = constants.s3Details.documentsFolderPath + fileDetails[0].directory_id + "/" + fileDetails[0].file_name
  let previewUrl = await s3.previewDocumentFile(key)
  let fileName = fileDetails[0].file_name
  commonHelper.sendResponse(res, 'success', { previewUrl, fileName }, null, '');
}

const updateFile = async (req, res) => {
  try {
    let fileData = await File.find({ file_name: req.body.newFileName, is_deleted: false })
    if (fileData.length > 0) {
      commonHelper.sendResponse(res, 'error', null, "File" + documentMessage.exist);
    } else {
      updatedData = await File.findOneAndUpdate({ _id: new ObjectId(req.body.itemId) }, { file_name: req.body.newFileName }, { upsert: true, new: true });
      let key = constants.s3Details.documentsFolderPath + updatedData.directory_id + "/" + req.body.oldFileName
      let newkey = constants.s3Details.documentsFolderPath + updatedData.directory_id + "/" + req.body.newFileName
      await s3.renameFileInS3(key, newkey)
      commonHelper.sendResponse(res, 'success', null, documentMessage.directoryUpdated);
    }
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }

}

const uploadDocumentFile = async (req, res) => {
  try {
    let fstream;
    let reqBodyData = {};
    let newFilename = ""
    req.busboy.on("field", function (key, value, keyTruncated, valueTruncated) {
      reqBodyData[key] = value;
    });
    await req.busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {
      newFilename = reqBodyData.documentName
      fstream = fs.createWriteStream(__dirname + '/../tmp/' + newFilename)
      file.pipe(fstream)
      fstream.on('close', async function () { })
    });
    req.busboy.on('finish', async function () {
      let fileData = await File.find({ file_name: reqBodyData.documentName, is_deleted: false })
      if (fileData.length > 0) {
        fs.unlink(__dirname + '/../tmp/' + newFilename, (err) => { })
        commonHelper.sendResponse(res, 'error', null, "File" + documentMessage.exist);
      } else {
        let createParams = {
          file_name: reqBodyData.documentName,
          directory_id: reqBodyData.directory,
          is_deleted: false,
          create_at: new Date(),
          created_by: new ObjectId(req.body.endUserId),
        }
        await File.create(createParams)
        await s3.checkDirectoryExist(reqBodyData.directory)
        var s3DocumentPath = constants.s3Details.documentsFolderPath + reqBodyData.directory + "/";
        await s3.uploadDocumentToS3(reqBodyData.documentName, s3DocumentPath)
        commonHelper.sendResponse(res, 'success', null, documentMessage.directoryUpdated);
      }
    })
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const resendInvite = async (req, res) => {
  try {
    const { _id } = req.body
    let encryptObj = { userId: _id, tokenExpiry: Date.now() + (constants.inviteTokenExpiry * 60 * 1000) }
    let inviteEncryptedToken = commonHelper.encryptData(encryptObj, process.env.CRYPTO_SECRET)
    // Update invite token
    await User.findOneAndUpdate({ _id: _id }, { inviteToken: inviteEncryptedToken });

    // Send email
    const link = `${process.env.BASE_URL}/admin/signup/${inviteEncryptedToken}`;
    triggerEmail.inviteAdmin('inviteAdmin', req.body, link)

    commonHelper.sendResponse(res, 'success', null, userMessage.resendInvite);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const revokeInvite = async (req, res) => {
  try {
    const { _id } = req.body
    // Update invite token
    // await User.findOneAndUpdate({ _id: _id }, { inviteToken: "" });
    await User.findByIdAndDelete(_id);
    commonHelper.sendResponse(res, 'success', null, userMessage.revokeInvite);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


const cometChatLog = async (req, res) => {
  try {
    let chatLog = new cometChatLogModel(req.body);
    await chatLog.save();
    commonHelper.sendResponse(res, 'success', '', 'Log saved successfully');
  } catch (error) {
    console.log("*******cometChatLog******", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

// const uploadProviders = async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const data = [];
//     const errorsList = [];

//     let headersValidated = false;
//     let validHeaders = true;
//     let rowNumber = 1;  // Start row number from 1
//     const npiSet = new Set();  // To track duplicate NPIs

//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on('headers', (headers) => {
//         // Validate if all required headers are present
//         headersValidated = true;
//         validHeaders = userCommonHelper.validateUploadProviderFileHeader(headers);

//         if (!validHeaders) {
//           fs.unlinkSync(filePath); // Delete the uploaded file after processing
//           commonHelper.sendResponse(res, 'info', null, infoMessage.csvFileHeaderMissing);
//         }
//       })
//       .on('data', (row) => {
//         if (headersValidated && validHeaders) {
//           rowNumber++;
//           // Clean up row data before validation
//           row['NPI'] = userCommonHelper.cleanNumericInput(row['NPI']);
//           row['phoneNumber'] = userCommonHelper.cleanNumericInput(row['phoneNumber']);
//           row['faxNumber'] = userCommonHelper.cleanNumericInput(row['faxNumber']);

//           // const errors = userCommonHelper.validateUploadProviderFile(row);
//           const errors = userCommonHelper.validateUploadProviderFile(row, npiSet);
//           if (errors.length > 0) {
//             // errorsList.push({ row, errors });
//             errorsList.push({ ...row, errors, rowNumber });
//           } else {
//             data.push({
//               Name: row["Name"],
//               Credentials: row["Credentials"],
//               Address: row["Address"],
//               phoneNumber: row["phoneNumber"],
//               faxNumber: row["faxNumber"],
//               NPI: row["NPI"],
//               errors: [],
//               rowNumber: ''
//             });
//           }
//         }
//       })
//       .on('end', async () => {
//         if (headersValidated && validHeaders) {
//           fs.unlinkSync(filePath); // Delete the uploaded file after processing
//           let allData = [...errorsList, ...data]
//           let allList = {
//             totalRecord: allData,
//             dataWithoutError: data,
//             dataWithError: errorsList,
//             totalRecordCount: allData.length,
//             errorRecordCount: errorsList.length
//           }

//           if (allData.length == 0) {
//             commonHelper.sendResponse(res, 'info', null, infoMessage.noRecordFoundInFile);
//           } else {
//             commonHelper.sendResponse(res, 'success', allList, 'File uploaded successfully');
//           }
//         }
//       })
//   } catch (error) {
//     console.log("*******uploadProviders******", error)
//     commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
//   }
// }


const uploadProviders = async (req, res) => {
  try {
    const data = [];
    const errorsList = [];

    let headersValidated = false;
    let validHeaders = true;
    let rowNumber = 1;  // Start row number from 1
    const npiSet = new Set();  // To track duplicate NPIs
    
    req.pipe(req.busboy); // Pipe the request to busboy
    
    req.busboy.on('file', (fieldname, file, filename) => {
      console.log('Filename:', filename);
        // Define a temporary path to save the file
        const saveTo = path.join(__dirname, '/../uploads/', filename.filename);
        console.log('Saving file to:', saveTo);
    
        // Stream the file into the server (you can skip this step if you don't need to save it)
        const fileStream = fs.createWriteStream(saveTo);
        file.pipe(fileStream);

        // Process the CSV file while saving it
        file.pipe(csv()) // Pipe the file through csv-parser
            .on('headers', (headers) => {
              console.log("headers>>>",headers)
              // Validate if all required headers are present
              headersValidated = true;
              validHeaders = userCommonHelper.validateUploadProviderFileHeader(headers);

              if (!validHeaders) {
                fs.unlink(saveTo, (err) => {
                  if(err){ console.error('Error deleting file validHeaders:', err)}
                }) 
                commonHelper.sendResponse(res, 'info', null, infoMessage.csvFileHeaderMissing);
              }
            })
            .on('data', (row) => {
                // console.log('Row:', row);
                if (headersValidated && validHeaders) {
                  rowNumber++;
                  // Clean up row data before validation
                  row['NPI'] = userCommonHelper.cleanNumericInput(row['NPI']);
                  row['phoneNumber'] = userCommonHelper.cleanNumericInput(row['phoneNumber']);
                  row['faxNumber'] = userCommonHelper.cleanNumericInput(row['faxNumber']);
        
                  // const errors = userCommonHelper.validateUploadProviderFile(row);
                  const errors = userCommonHelper.validateUploadProviderFile(row, npiSet);
                  if (errors.length > 0) {
                    // errorsList.push({ row, errors });
                    errorsList.push({ ...row, errors, rowNumber });
                  } else {
                    data.push({
                      Name: row["Name"],
                      Credentials: row["Credentials"],
                      Address: row["Address"],
                      phoneNumber: row["phoneNumber"],
                      faxNumber: row["faxNumber"],
                      NPI: row["NPI"],
                      errors: [],
                      rowNumber: ''
                    });
                  }
                }
            })
            .on('end', () => {
              if (headersValidated && validHeaders) {
                fs.unlink(saveTo, (err) => {
                  if (err) {
                      console.error('Error deleting file:', err);
                  }
                }) // Delete the uploaded file after processing
                let allData = [...errorsList, ...data]
                let allList = {
                  totalRecord: allData,
                  dataWithoutError: data,
                  dataWithError: errorsList,
                  totalRecordCount: allData.length,
                  errorRecordCount: errorsList.length
                }
      
                if (allData.length == 0) {
                  commonHelper.sendResponse(res, 'info', null, infoMessage.noRecordFoundInFile);
                } else {
                  commonHelper.sendResponse(res, 'success', allList, 'File uploaded successfully');
                }
              }
            })
            .on('error', (error) => {
                console.error('Error processing CSV file:', error);
                commonHelper.sendResponse(res, 'error', null, 'Error processing file');
            });
    });

    req.busboy.on('error', (err) => {
        console.error('Busboy error:', err);
        commonHelper.sendResponse(res, 'error', null, 'File Upload Failed!');
    });

  } catch (error) {
    console.log("*******uploadInsurances******", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const saveUploadedProviderData = async (req, res) => {
  try {
    console.log("req.body>>>>", req.body)
    let records = req.body
    const errorsList = [];
    let updateCount = { count: 0 };
    let insertCount = { count: 0 };
    // Process records in batches of 100
    const batchSize = 100;
    // const batchSize = 2;
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      console.log("batch>>>", batch)
      console.log("batchSize>>>", batchSize)
      const batchErrors = await processBatch(batch, updateCount, insertCount);
      errorsList.push(...batchErrors);
    }

    console.log("errorsList>>>", errorsList)
    if (errorsList.length > 0) {
      await ProviderLogs.insertMany(errorsList);
    }

    let reponseData = {
      errorsCount: errorsList.length,
      updateCount: updateCount.count,
      insertCount: insertCount.count
    }
    commonHelper.sendResponse(res, 'success', reponseData, 'Data uploaded successfully');
  } catch (error) {
    console.log("*******saveUploadedProviderData******", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

// Process data in batches
async function processBatch(batch, updateCount, insertCount) {
  const errorsList = [];

  // Create promises for batch processing
  const operations = batch.map(async row => {
    const doctorData = {
      name: row.Name,
      credentials: row.Credentials,
      address: row.Address,
      phoneNumber: row.phoneNumber,
      faxNumber: row.faxNumber,
      npi: row.NPI
    };

    try {
      // Check if the doctor exists in the database by NPI
      const existingDoctor = await Provider.findOne({ npi: row.NPI });
      if (existingDoctor) {
        // If doctor exists, update the record and set the updatedDate
        doctorData.updatedAt = new Date();
        doctorData.status = "Active";
        await Provider.updateOne({ npi: row.NPI }, doctorData);
        updateCount.count++;
      } else {
        // If doctor doesn't exist, insert a new record with createdDate
        doctorData.createdAt = new Date();
        const newDoctor = new Provider(doctorData);
        await newDoctor.save();
        insertCount.count++;
      }
    } catch (err) {
      console.error(`Failed to update/insert record with NPI ${row["Doctor NPI"]}:`, err);
      errorsList.push({
        row,
        error: err
      });
    }
  });

  // Wait for all operations in this batch to complete
  await Promise.all(operations);

  return errorsList;
}

const getProviderList = async (req, res) => {
  try {
    const { query, fields, order, offset, limit } = req.body;
    let providerList = await Provider.find(query, fields).sort(order).skip(offset).limit(limit).lean();
    let totalCount = await Provider.find(query).countDocuments()
    commonHelper.sendResponse(res, 'success', { providerList, totalCount }, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const deleteProvider = async (req, res) => {
  try {
    const { _id } = req.body
    await Provider.findOneAndUpdate({ _id: _id }, { status: 'Delete' });
    commonHelper.sendResponse(res, 'success', null, userMessage.providerDelete);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

// const uploadInsurances = async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const data = [];
//     const errorsList = [];

//     let headersValidated = false;
//     let validHeaders = true;
//     let rowNumber = 1;  // Start row number from 1
//     const payerIDSet = new Set();  // To track duplicate Payer Ids

//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on('headers', (headers) => {
//         console.log("headers>>>",headers)
//         // Validate if all required headers are present
//         headersValidated = true;
//         validHeaders = userCommonHelper.validateUploadInsuranceFileHeader(headers);
//         console.log("validHeaders>>",validHeaders)

//         if (!validHeaders) {
//           fs.unlinkSync(filePath); // Delete the uploaded file after processing
//           commonHelper.sendResponse(res, 'info', null, infoMessage.csvFileHeaderMissing);
//         }
//       })
//       .on('data', (row) => {
//         if (headersValidated && validHeaders) {
//           console.log("row>>>>>>>", row)
//           rowNumber++;
//           // Clean up row data before validation
//           row['payerID'] = userCommonHelper.cleanNumericInput(row['payerID']);
//           row['phoneNumber'] = userCommonHelper.cleanNumericInput(row['phoneNumber']);
//           row['insuranceType'] = userCommonHelper.trimString(row['insuranceType']);
//           row['billingType'] = userCommonHelper.cleanNumericInput(row['billingType']);

//           const errors = userCommonHelper.validateUploadInsuranceFile(row, payerIDSet);
//           console.log("errors>>>>>", errors)
//           if (errors.length > 0) {
//             // errorsList.push({ row, errors });
//             errorsList.push({ ...row, errors, rowNumber });
//           } else {
//             data.push({
//               insuranceName: row["insuranceName"],
//               insuranceType: row["insuranceType"],
//               insuranceAddress: row["insuranceAddress"],
//               payerID: row["payerID"],
//               phoneNumber: row["phoneNumber"],
//               billingType: row["billingType"],
//               errors: [],
//               rowNumber: ''
//             });
//           }
//         }
//       })
//       .on('end', async () => {
//         if (headersValidated && validHeaders) {
//           fs.unlinkSync(filePath); // Delete the uploaded file after processing
//           let allData = [...errorsList, ...data]
//           let allList = {
//             totalRecord: allData,
//             dataWithoutError: data,
//             dataWithError: errorsList,
//             totalRecordCount: allData.length,
//             errorRecordCount: errorsList.length
//           }

//           if (allData.length == 0) {
//             commonHelper.sendResponse(res, 'info', null, infoMessage.noRecordFoundInFile);
//           } else {
//             commonHelper.sendResponse(res, 'success', allList, 'File uploaded successfully');
//           }
//         }
//       })
//   } catch (error) {
//     console.log("*******uploadInsurances******", error)
//     commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
//   }
// }

const uploadInsurances = async (req, res) => {
  try {
    const data = [];
    const errorsList = [];

    let headersValidated = false;
    let validHeaders = true;
    let rowNumber = 1;  // Start row number from 1
    const payerIDSet = new Set();  // To track duplicate Payer Ids
    
    req.pipe(req.busboy); // Pipe the request to busboy
    
    req.busboy.on('file', (fieldname, file, filename) => {
      console.log('Filename:', filename);
        // Define a temporary path to save the file
        const saveTo = path.join(__dirname, '/../uploads/', filename.filename);
        console.log('Saving file to:', saveTo);
    
        // Stream the file into the server (you can skip this step if you don't need to save it)
        const fileStream = fs.createWriteStream(saveTo);
        file.pipe(fileStream);

        // Process the CSV file while saving it
        file.pipe(csv()) // Pipe the file through csv-parser
            .on('headers', (headers) => {
              console.log("headers>>>",headers)
              // Validate headers
              headersValidated = true;
              validHeaders = userCommonHelper.validateUploadInsuranceFileHeader(headers);
              if (!validHeaders) {
                // fs.unlink(saveTo); // Delete the uploaded file after processing
                fs.unlink(saveTo, (err) => {
                  if(err){ console.error('Error deleting file validHeaders:', err)}
                }) 
                commonHelper.sendResponse(res, 'info', null, infoMessage.csvFileHeaderMissing);
              }
            })
            .on('data', (row) => {
                // console.log('Row:', row);
                if (headersValidated && validHeaders) {
                  console.log("row>>>>>>>", row)
                  rowNumber++;
                  // Clean up row data before validation
                  row['payerID'] = userCommonHelper.cleanNumericInput(row['payerID']);
                  row['phoneNumber'] = userCommonHelper.cleanNumericInput(row['phoneNumber']);
                  row['insuranceType'] = userCommonHelper.trimString(row['insuranceType']);
                  row['billingType'] = userCommonHelper.cleanNumericInput(row['billingType']);

                  const errors = userCommonHelper.validateUploadInsuranceFile(row, payerIDSet);
                  console.log("errors>>>>>", errors)
                  if (errors.length > 0) {
                    // errorsList.push({ row, errors });
                    errorsList.push({ ...row, errors, rowNumber });
                  } else {
                    data.push({
                      insuranceName: row["insuranceName"],
                      insuranceType: row["insuranceType"],
                      insuranceAddress: row["insuranceAddress"],
                      payerID: row["payerID"],
                      phoneNumber: row["phoneNumber"],
                      billingType: row["billingType"],
                      errors: [],
                      rowNumber: ''
                    });
                  }
                }
            })
            .on('end', () => {
                if (headersValidated && validHeaders) {
                  fs.unlink(saveTo, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                  }) // Delete the uploaded file after processing

                  let allData = [...errorsList, ...data]
                  let allList = {
                    totalRecord: allData,
                    dataWithoutError: data,
                    dataWithError: errorsList,
                    totalRecordCount: allData.length,
                    errorRecordCount: errorsList.length
                  }
        
                  if (allData.length == 0) {
                    commonHelper.sendResponse(res, 'info', null, infoMessage.noRecordFoundInFile);
                  } else {
                    commonHelper.sendResponse(res, 'success', allList, 'File uploaded successfully');
                  }
                }
            })
            .on('error', (error) => {
                console.error('Error processing CSV file:', error);
                commonHelper.sendResponse(res, 'error', null, 'Error processing file');
            });
    });

    req.busboy.on('error', (err) => {
        console.error('Busboy error:', err);
        commonHelper.sendResponse(res, 'error', null, 'File Upload Failed!');
    });

  } catch (error) {
    console.log("*******uploadInsurances******", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


// const uploadInsurances = async (req, res) => {
//   try {

//     console.log("<<<<<<<< uploadInsurances1 >>>>>>>")
//     console.log("<< req.headers >>>",req.headers)

//     const results = []; // Store parsed CSV data
    
//     req.pipe(req.busboy); // Pipe the request to busboy
    
//     req.busboy.on('file', (fieldname, file, filename) => {
//       console.log('Fieldname:', fieldname);
//       console.log('Filename:', filename);
//       console.log('Type of filename:', typeof filename);
        
//         // Define a temporary path to save the file
//         // const saveTo = path.join(__dirname, '/../tmp/', filename);
//         // const safeFilename = filename || `upload_${Date.now()}.csv`;
//         const saveTo = path.join(__dirname, '/../uploads/', filename.filename);
//         console.log('Saving file to:', saveTo);
    

//         // Stream the file into the server (you can skip this step if you don't need to save it)
//         const fileStream = fs.createWriteStream(saveTo);
//         file.pipe(fileStream);

//         // Process the CSV file while saving it
//         file.pipe(csv()) // Pipe the file through csv-parser
//             .on('data', (data) => {
//                 console.log('Row:', data);
//                 results.push(data); // Push each row to results
//             })
//             .on('end', () => {
//                 console.log('CSV file successfully processed.');
//                 fs.unlink(saveTo, (err) => {
//                   if (err) {
//                       console.error('Error deleting file:', err);
//                   }
//                 })  
                
//                 res.status(200).json({
//                     message: 'File uploaded and parsed successfully!',
//                     data: results // Send parsed CSV data
//                 });
//             })
//             .on('error', (error) => {
//                 console.error('Error processing CSV file:', error);
//                 res.status(500).send({ message: 'Error processing file', error });
//             });
//     });

//     req.busboy.on('error', (err) => {
//         console.error('Busboy error:', err);
//         res.status(500).send({ message: 'Upload failed', error: err });
//     });

//   } catch (error) {
//     console.log("*******uploadInsurances******", error)
//     commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
//   }
// }

const saveUploadedInsurancesData = async (req, res) => {
  try {
    console.log("req.body>>>>", req.body)
    let records = req.body
    const errorsList = [];
    let updateCount = { count: 0 };
    let insertCount = { count: 0 };
    // Process records in batches of 100
    const batchSize = 100;
    // const batchSize = 2;
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      console.log("batch>>>", batch)
      console.log("batchSize>>>", batchSize)
      const batchErrors = await processUplaodInsurancesBatch(batch, updateCount, insertCount);
      errorsList.push(...batchErrors);
    }

    console.log("errorsList>>>", errorsList)
    if (errorsList.length > 0) {
      await UploadInsurancesLogs.insertMany(errorsList);
    }

    let reponseData = {
      errorsCount: errorsList.length,
      updateCount: updateCount.count,
      insertCount: insertCount.count
    }
    commonHelper.sendResponse(res, 'success', reponseData, 'Data uploaded successfully');
  } catch (error) {
    console.log("*******saveUploadedInsurancesData******", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

async function processUplaodInsurancesBatch(batch, updateCount, insertCount) {
  const errorsList = [];

  // Create promises for batch processing
  const operations = batch.map(async row => {
    const insurancesData = {
      insuranceName: row.insuranceName,
      insuranceType: row.insuranceType,
      insuranceAddress: row.insuranceAddress,
      payerID: row.payerID,
      phoneNumber: row.phoneNumber,
      billingType: row.billingType
    };

    try {
      // Check if the insurance exists in the database by payerID
      const existingInsurance = await UploadInsurances.findOne({ payerID: row.payerID });
      if (existingInsurance) {
        // If insurance exists, update the record and set the updatedDate
        insurancesData.updatedAt = new Date();
        insurancesData.status = "Active";
        await UploadInsurances.updateOne({ payerID: row.payerID }, insurancesData);
        updateCount.count++;
      } else {
        // If insurance doesn't exist, insert a new record with createdDate
        insurancesData.createdAt = new Date();
        const newInsurance = new UploadInsurances(insurancesData);
        await newInsurance.save();
        insertCount.count++;
      }
    } catch (err) {
      console.error(`Failed to update/insert record with Payer ID ${row["payerID"]}:`, err);
      errorsList.push({
        row,
        error: err
      });
    }
  });

  // Wait for all operations in this batch to complete
  await Promise.all(operations);

  return errorsList;
}

const getUploadInsuranceList = async (req, res) => {
  try {
    const { query, fields, order, offset, limit } = req.body;
    let insuranceList = await UploadInsurances.find(query, fields).sort(order).skip(offset).limit(limit).lean();
    let totalCount = await UploadInsurances.find(query).countDocuments()
    commonHelper.sendResponse(res, 'success', { insuranceList, totalCount }, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const deleteInsurance = async (req, res) => {
  try {
    const { _id } = req.body
    await UploadInsurances.findOneAndUpdate({ _id: _id }, { status: 'Delete' });
    commonHelper.sendResponse(res, 'success', null, userMessage.insuranceDelete);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

//Function to get reports based on type
const getReports = async (req, res) => {
  try {
    let results;
    const { type } = req.body
    switch (type) {
      case "summary": //Summary Report
        results = await summaryReport(req)
        break;
      case "therapistReport": //Therapist Report
        results = await TherapistReport(req)
        break;
    }
    commonHelper.sendResponse(res, 'success', results, '');
  } catch (error) {
    console.log("*********getReports*******error*", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


async function summaryReport(req) {
  const { year, practiceLocation, optionType } = req.body
  let query = {
    "appointmentDate": {
      $gte: new Date(moment(year).startOf('year')),
      $lte: new Date(moment(year).endOf('year'))
    },
    practiceLocation: practiceLocation
  }
  let aggrQuery = [
    {
      "$lookup": {
        from: "subjectives",
        localField: "_id",
        foreignField: "appointmentId",
        as: "subjective"
      }
    },
    {
      "$lookup": {
        from: "billings",
        localField: "_id",
        foreignField: "appointmentId",
        as: "billing"
      }
    },
    {
      $match: query
    },
    {
      $project: {
        "_id": 1, "appointmentDate": 1, "status": 1, "appointmentStatus": 1, "appointmentType": 1,
        "subjective.soap_note_type": 1, "subjective.status": 1,
        "billing.soap_note_type": 1, "billing.total_units": 1, "billing.status": 1,
      }
    },
    {
      $sort: { "appointmentDate": 1 }
    }
  ]

  let results = await Appointment.aggregate(aggrQuery);
  let currentYearResults = await summaryData(optionType, results)

  let queryLastYear = {
    "appointmentDate": {
      $gte: new Date(moment(year).subtract(1, 'years').startOf('year')),
      $lte: new Date(moment(year).subtract(1, 'years').endOf('year')),
    },
    practiceLocation: practiceLocation
  }
  let aggrQueryLastYear = [
    {
      "$lookup": {
        from: "subjectives",
        localField: "_id",
        foreignField: "appointmentId",
        as: "subjective"
      }
    },
    {
      "$lookup": {
        from: "billings",
        localField: "_id",
        foreignField: "appointmentId",
        as: "billing"
      }
    },
    {
      $match: queryLastYear
    },
    {
      $project: {
        "_id": 1, "appointmentDate": 1, "status": 1, "appointmentStatus": 1, "appointmentType": 1,
        "subjective.soap_note_type": 1, "subjective.status": 1,
        "billing.soap_note_type": 1, "billing.total_units": 1, "billing.status": 1,
      }
    },
    {
      $sort: { "appointmentDate": 1 }
    }
  ]

  let resultsLastYear = await Appointment.aggregate(aggrQueryLastYear);
  let lastYearResults = await summaryData(optionType, resultsLastYear)
  let mainLoop
  let finalReportsData = []
  let mainTotal
  if (optionType == 'Monthly') {
    mainLoop = moment.months()
    mainTotal = 12
  } else {
    mainTotal = 4
    mainLoop = ['1ST QTR', '2ST QTR', '3ST QTR', '4ST QTR']
  }

  let evalsTotal = 0
  let cxTotal = 0
  let cxperTotal = 0
  let nsTotal = 0
  let nsperTotal = 0
  let totalptsTotal = 0
  let totalpts2Total = 0
  let prioryearTotal = 0
  let unitsbilledTotal = 0
  let unitsvistTotal = 0
  let aquaticTotal = 0
  let aquatic2Total = 0

  for (let i = 0; i < mainTotal; i++) {
    let row = currentYearResults.filter((item) => (item.month == mainLoop[i]))[0];
    let rowLast = lastYearResults.filter((item) => (item.month == mainLoop[i]))[0];
    let lastAquatic = rowLast ? rowLast.aquatic : 0
    let sumofAllLast = 0
    if (rowLast) {
      sumofAllLast = (rowLast.initialExam + rowLast.dailyNote + rowLast.progressNote + rowLast.dischargeNote + rowLast.caseNote)
      aquatic2Total = aquatic2Total + lastAquatic
    }
    totalpts2Total = totalpts2Total + sumofAllLast

    if (row == undefined) {
      finalReportsData.push({
        month: mainLoop[i],
        evals: 0,
        cx: 0,
        cxper: 0,
        ns: 0,
        nsper: 0,
        totalpts: 0,
        totalpts2: 0,
        prioryear: 0,
        unitsbilled: 0,
        unitsvist: 0,
        aquatic: 0,
        aquatic2: lastAquatic
      })
    } else {
      evalsTotal = evalsTotal + row.evals
      cxTotal = cxTotal + row.cx
      aquaticTotal = aquaticTotal + row.aquatic

      let sumofAll = (row.initialExam + row.dailyNote + row.progressNote + row.dischargeNote + row.caseNote)
      let cxper = 0, nsper = 0
      totalptsTotal = totalptsTotal + sumofAll

      prioryear = sumofAllLast > 0 ? (((sumofAll - sumofAllLast) / sumofAllLast) * 100) : 0
      prioryearTotal = prioryearTotal + prioryear
      let unitsbilled = row.unitsbilled
      unitsbilledTotal = unitsbilledTotal + unitsbilled

      let unitsvist = 0
      if (sumofAll > 0) {
        if (row.cx > 0) {
          cxper = ((row.cx / sumofAll) * 100)
          cxperTotal = cxperTotal + cxper
        }
        if (row.ns > 0) {
          nsper = ((row.ns / sumofAll) * 100)
          nsperTotal = nsperTotal + nsper
        }
        unitsvist = (unitsbilled / sumofAll)
        unitsvistTotal = unitsvistTotal + unitsvist
      }

      finalReportsData.push({
        month: mainLoop[i],
        evals: row.evals,
        cx: row.cx,
        cxper: Number(cxper.toFixed(2)),
        ns: row.ns,
        nsper: Number(nsper.toFixed(2)),
        totalpts: sumofAll,
        totalpts2: sumofAllLast,
        prioryear: prioryear,
        unitsbilled: unitsbilled,
        unitsvist: Number(unitsvist.toFixed(2)),
        aquatic: row.aquatic,
        aquatic2: lastAquatic
      })
    }
  }

  finalReportsData.push({
    month: 'TOTAL',
    evals: evalsTotal,
    cx: cxTotal,
    cxper: Number(cxperTotal.toFixed(2)) + "%",
    ns: nsTotal,
    nsper: Number(nsperTotal.toFixed(2)) + "%",
    totalpts: totalptsTotal,
    totalpts2: totalpts2Total,
    prioryear: prioryearTotal + "%",
    unitsbilled: unitsbilledTotal,
    unitsvist: Number(unitsvistTotal.toFixed(2)),
    aquatic: aquaticTotal,
    aquatic2: aquatic2Total,
  })
  return finalReportsData;
}

async function summaryData(optionType, results) {
  let monthName = ''
  let quarterNumber = 0
  let evals = 0
  let cx = 0
  let cxper = 0
  let ns = 0
  let nsper = 0
  let totalpts = 0
  let totalpts2 = 0
  let prioryear = 0
  let unitsbilled = 0
  let unitsvist = 0
  let aquatic = 0
  let aquatic2 = 0
  let initialExam = 0, dailyNote = 0, progressNote = 0, dischargeNote = 0, caseNote = 0, noShow = 0
  let finalResults = []
  let totoalResultCounter = results.length
  let totalCnt = 0
  await results.forEach(element => {
    totalCnt++
    if (element.status == 'Cancelled' || element.appointmentStatus == 'Cancelled') {
      cx++
    }
    if (element.appointmentType == 'Aquatic') {
      aquatic++
    }
    if (element.appointmentStatus == 'No-Show') {
      ns++
      noShow++
    }


    if (element.billing && element.billing.length > 0) {
      let initial_bill = element.billing.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "initial_examination"))[0];
      let daily_bill = element.billing.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "daily_note"))[0];
      let progress_bill = element.billing.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "progress_note"))[0];
      let discharge_bill = element.billing.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "discharge_note"))[0];
      let case_bill = element.billing.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "case_note"))[0];

      if (initial_bill) {
        unitsbilled = parseInt(initial_bill.total_units)
      }
      if (daily_bill) {
        unitsbilled = unitsbilled + parseInt(daily_bill.total_units)
      }
      if (progress_bill) {
        unitsbilled = unitsbilled + parseInt(progress_bill.total_units)
      }
      if (discharge_bill) {
        unitsbilled = unitsbilled + parseInt(discharge_bill.total_units)
      }
      if (case_bill) {
        unitsbilled = unitsbilled + parseInt(case_bill.total_units)
      }
    }

    if (element.subjective && element.subjective.length > 0) {
      let initial_examination = element.subjective.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "initial_examination"))[0];
      let daily_note = element.subjective.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "daily_note"))[0];
      let progress_note = element.subjective.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "progress_note"))[0];
      let discharge_note = element.subjective.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "discharge_note"))[0];
      let case_note = element.subjective.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "case_note"))[0];
      if (initial_examination) {
        evals++
        initialExam++
      }
      if (daily_note) {
        dailyNote++
      }
      if (progress_note) {
        progressNote++
      }
      if (discharge_note) {
        dischargeNote++
      }
      if (case_note) {
        caseNote++
      }
    }

    if (
      (optionType == 'Monthly' && monthName != '' && (totoalResultCounter == totalCnt || monthName != moment(element.appointmentDate).format('MMMM'))) ||
      (optionType == 'Quarterly' && quarterNumber > 0 && (totoalResultCounter == totalCnt || quarterNumber != moment(element.appointmentDate).quarter()))) {

      finalResults.push({
        month: optionType == 'Monthly' ? monthName : quarterNumber + "ST QTR",
        evals: evals,
        cx: cx,
        cxper: cxper + "%",
        ns: ns,
        nsper: nsper + "%",
        totalpts: totalpts,
        totalpts2: totalpts2,
        prioryear: prioryear + "%",
        unitsbilled: unitsbilled,
        unitsvist: unitsvist,
        aquatic: aquatic,
        aquatic2: aquatic2,
        monthName: monthName,
        quarterNumber: quarterNumber,
        appointmentId: element._id,

        noShow: noShow,
        initialExam: initialExam,
        dailyNote: dailyNote,
        progressNote: progressNote,
        dischargeNote: dischargeNote,
        caseNote: caseNote
      })

      evals = 0
      cx = 0
      cxper = 0
      ns = 0
      nsper = 0
      totalpts = 0
      totalpts2 = 0
      prioryear = 0
      unitsbilled = 0
      unitsvist = 0
      aquatic = 0
      initialExam = 0
      noShow = 0
      dailyNote = 0
      progressNote = 0
      dischargeNote = 0
      caseNote = 0
    }

    if (optionType == 'Monthly') {
      monthName = moment(element.appointmentDate).format('MMMM');
    } else {
      quarterNumber = moment(element.appointmentDate).quarter()
    }
  })
  return finalResults
}

async function TherapistReport(req) {
  const { type, year, practiceLocation, optionType,therapistNameValue } = req.body
  let query = {
    "appointmentDate": {
      $gte: new Date(moment(year).startOf('year')),
      $lte: new Date(moment(year).endOf('year'))
    },
    practiceLocation: practiceLocation,
    therapistId:{$ne:null}
  }

  if(therapistNameValue!=''){
    query.therapistId = new ObjectId(therapistNameValue)
  }

  let aggrQuery = [
    {
      "$lookup": {
        from: "subjectives",
        localField: "_id",
        foreignField: "appointmentId",
        as: "subjective"
      }
    },
    {
      "$lookup": {
        from: "billings",
        localField: "_id",
        foreignField: "appointmentId",
        as: "billing"
      }
    },
    {
      "$lookup": {
        from: "users",
        localField: "therapistId",
        foreignField: "_id",
        as: "users"
      }
    },
    {
      $match: query
    },
    {
      $project: {
        "_id": 1, "appointmentDate": 1, "status": 1,"therapistId":1, "appointmentStatus": 1, "appointmentType": 1,
        "subjective.soap_note_type": 1, "subjective.status": 1,
        "billing.soap_note_type": 1, "billing.total_units": 1, "billing.status": 1,"users.firstName":1,"users.lastName":1,
      }
    },
    {
      $sort: { "appointmentDate": 1 }
    }
  ]

  let results = await Appointment.aggregate(aggrQuery);
  let monthName = ''
  let yearNumber = 0
  let evals = 0
  let cx = 0
  let cxper = 0
  let ns = 0
  let nsper = 0
  let totalpts = 0
  let unitsbilled = 0
  let unitsvist = 0
  let initialExam = 0, dailyNote = 0, progressNote = 0, dischargeNote = 0, caseNote = 0
  let finalResults = []
  let totoalResultCounter = results.length
  let totalCnt = 0
  await results.forEach(element => {
    totalCnt++
    if (element.status == 'Cancelled' || element.appointmentStatus == 'Cancelled') {
      cx++
    }
    if (element.appointmentStatus == 'No-Show') {
      ns++
    }

    if (element.subjective && element.subjective.length > 0) {
      let initial_examination = element.subjective.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "initial_examination"))[0];
      let daily_note = element.subjective.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "daily_note"))[0];
      let progress_note = element.subjective.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "progress_note"))[0];
      let discharge_note = element.subjective.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "discharge_note"))[0];
      // let case_note = element.subjective.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "case_note"))[0];
      if (element.billing && element.billing.length > 0) {
        let initial_bill = element.billing.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "initial_examination"))[0];
        let daily_bill = element.billing.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "daily_note"))[0];
        let progress_bill = element.billing.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "progress_note"))[0];
        let discharge_bill = element.billing.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "discharge_note"))[0];
        let case_bill = element.billing.filter((item) => (item.status == 'Finalized' && item.soap_note_type == "case_note"))[0];
  
        if (initial_bill) {
          unitsbilled = parseInt(initial_bill.total_units)
        }
        if (daily_bill) {
          unitsbilled = unitsbilled + parseInt(daily_bill.total_units)
        }
        if (progress_bill) {
          unitsbilled = unitsbilled + parseInt(progress_bill.total_units)
        }
        if (discharge_bill) {
          unitsbilled = unitsbilled + parseInt(discharge_bill.total_units)
        }
        if (case_bill) {
          unitsbilled = unitsbilled + parseInt(case_bill.total_units)
        }
      }

      if (initial_examination) {
        evals++
        initialExam++
      }
      if (daily_note) {
        dailyNote++
      }
      if (progress_note) {
        progressNote++
      }
      if (discharge_note) {
        dischargeNote++
      }
      
    }

    let sumofAll = (initialExam + dailyNote + progressNote + dischargeNote)
    unitsvist = ((Number(unitsbilled) / sumofAll).toFixed(2)!='NaN')?(Number(unitsbilled) / sumofAll).toFixed(2):0
    if (sumofAll > 0) {
      if (cx > 0) {
        cxper = ((cx / sumofAll) * 100)
      }
      if (ns > 0) {
        nsper = ((ns / sumofAll) * 100)
      }
    }

    if (
      (optionType == 'Monthly' && monthName != '' && monthName != moment(element.appointmentDate).format('MMMM')) ||
      (optionType == 'Anually' && yearNumber > 0 && (totoalResultCounter == totalCnt || yearNumber != moment(element.appointmentDate).format('YYYY')))) {
      totalpts = sumofAll
      finalResults.push({
        provider: element.users[0].firstName +' '+element.users[0].lastName,
        duration: optionType == 'Monthly' ? moment(element.appointmentDate).format('MMM YY') : year,
        evals: evals,
        cx: cx,
        cxper: Number(cxper.toFixed(2)) + "%",
        ns: ns,
        nsper: Number(nsper.toFixed(2)) + "%",
        totalpts: totalpts,
        unitsbilled: unitsbilled,
        unitsvist: unitsvist
      })

      evals = 0
      cx = 0
      cxper = 0
      ns = 0
      nsper = 0
      totalpts = 0
      unitsbilled = 0
      unitsvist = 0
      initialExam = 0
      dailyNote = 0
      progressNote = 0
      dischargeNote = 0
      caseNote = 0
    }

    if (optionType == 'Monthly') {
      monthName = moment(element.appointmentDate).format('MMMM');
    } else {
      yearNumber = moment(element.appointmentDate).format('YYYY')
    }
  })
  return finalResults
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
  changeProfileImage,
  getDefaultDirectories,
  getDirectoryItems,
  getDefaultDirectoriesAndItems,
  createDirectory,
  updateDirectory,
  removeDirectoryOrFile,
  previewDocumentFile,
  updateFile,
  uploadDocumentFile,
  cometChatLog,
  resendInvite,
  revokeInvite,
  uploadProviders,
  saveUploadedProviderData,
  getProviderList,
  deleteProvider,
  uploadInsurances,
  saveUploadedInsurancesData,
  getUploadInsuranceList,
  deleteInsurance,
  getReports,
  updateSignature
};