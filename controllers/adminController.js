const User = require('../models/userModel');
const { userMessage, commonMessage, infoMessage, documentMessage } = require('../helpers/message');
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
        headers: {accept: 'application/json', 'content-type': 'application/json', apikey: constants.cometChatApikey},
        body: JSON.stringify({
          uid: uid,
          name: fullName,
          role:'system_admin'
        })
      };

      fetch(url, options)
        .then(res => res.json())
        .then(json => console.log("System admin created in comet chat : ", json))
        .catch(err => console.log('URL call error: ' + err));
   
  } catch (error) {
    console.log("createSystemAdminInCometChat error>>>",error)
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
        if(result!=null && (!result.inviteToken || result.inviteToken!=bodyInviteToken)){
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
    userList = userList.map( (user) => ({
      ...user,
      inviteTokenStatus: user.inviteToken? checkTokenExpire(user.inviteToken):"blank"
    }));

    let totalCount = await User.find(query).count()
    commonHelper.sendResponse(res, 'success', { userList, totalCount }, '');
  } catch (error) {
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

const getDefaultDirectories = async (req, res) => {
  try {
    let queryParams = {is_deleted:false,"selected-directory.role_name":req.body.userRole}
    if(req.body.searchValue!=""){
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
    commonHelper.sendResponse(res, 'success', { directoryList }, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getDirectoryItems = async (req, res) => {
  try {
    let directoryDetails = await Directory.find({_id: req.body.directory});
    if(directoryDetails.length>0){
      let query = {is_deleted:false,parent_directory_id: directoryDetails[0]._id}
      let fileQuery = {is_deleted:false,directory_id: directoryDetails[0]._id}
      if(req.body.searchValue!=""){
        query.directory_name = { '$regex': req.body.searchValue, '$options': "i" }
        fileQuery.file_name = { '$regex': req.body.searchValue, '$options': "i" }
      }
      let directoryList =  await Directory.find(query);
      let fileList =  await File.find(fileQuery);
      commonHelper.sendResponse(res, 'success', { directoryList,fileList }, '');
    }else{
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  } catch (error) {
    console.log(error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const createDirectory = async (req, res) => {
  try {
    let directories = await Directory.find({directory_name: req.body.directoryName,is_deleted:false})
    if(directories.length>0){
      commonHelper.sendResponse(res, 'error', null, "Directory"+documentMessage.exist);
    }else{
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
    let directories = await Directory.find({directory_name: req.body.directoryName,is_deleted:false})
    if(directories.length>0){
      commonHelper.sendResponse(res, 'error', null, "Directory"+documentMessage.exist);
    }else{
      await Directory.updateOne({ _id: new ObjectId(req.body.directoryId) }, { directory_name: req.body.directoryName });
      commonHelper.sendResponse(res, 'success', null, documentMessage.directoryUpdated);
    }
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const removeDirectoryOrFile = async (req, res) => {
  try {
    if(req.body.sourceType == 'directory'){
      await Directory.updateOne({ _id: new ObjectId(req.body.removeItemId) }, { is_deleted: true });
      await Directory.updateMany({ parent_directory_id: new ObjectId(req.body.removeItemId) }, { is_deleted: true });
      await File.updateMany({ directory_id: new ObjectId(req.body.removeItemId) }, { is_deleted: true });
    }else{
      await File.updateOne({ _id: new ObjectId(req.body.removeItemId) }, { is_deleted: true });
    }
    commonHelper.sendResponse(res, 'success', {}, infoMessage.deleted);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const previewDocumentFile = async (req, res) => {
  let fileDetails = await File.find({ _id: new ObjectId(req.body.fileId) })
  let key = constants.s3Details.documentsFolderPath+fileDetails[0].directory_id+"/"+fileDetails[0].file_name
  let previewUrl = await s3.previewDocumentFile(key)
  let fileName = fileDetails[0].file_name
  commonHelper.sendResponse(res, 'success', { previewUrl,fileName }, null,'');
}

const updateFile = async (req, res) => {
  try {
    let fileData = await File.find({ file_name: req.body.newFileName,is_deleted:false})
      if(fileData.length>0){
        commonHelper.sendResponse(res, 'error', null, "File"+documentMessage.exist);
      }else{
        updatedData = await File.findOneAndUpdate({ _id: new ObjectId(req.body.itemId) }, { file_name: req.body.newFileName },{upsert: true, new: true});
          let key = constants.s3Details.documentsFolderPath+updatedData.directory_id+"/"+req.body.oldFileName
          let newkey = constants.s3Details.documentsFolderPath+updatedData.directory_id+"/"+req.body.newFileName
          await s3.renameFileInS3(key,newkey)
          commonHelper.sendResponse(res, 'success', null, documentMessage.directoryUpdated);
        } 
      }catch (error) {
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
      fstream.on('close', async function () {})
    });
    req.busboy.on('finish', async function () {
      let fileData = await File.find({ file_name: reqBodyData.documentName,is_deleted:false})
      if(fileData.length>0){
        fs.unlink(__dirname + '/../tmp/' + newFilename, (err) => {})
        commonHelper.sendResponse(res, 'error', null, "File"+documentMessage.exist);
      }else{
          let createParams = {
            file_name: reqBodyData.documentName,
            directory_id: reqBodyData.directory,
            is_deleted: false,
            create_at: new Date(),
            created_by: new ObjectId(req.body.endUserId),
          }
          await File.create(createParams)
          await s3.checkDirectoryExist(reqBodyData.directory)
          var s3DocumentPath = constants.s3Details.documentsFolderPath+reqBodyData.directory+"/";
          await s3.uploadDocumentToS3(reqBodyData.documentName,s3DocumentPath)
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
    await User.findOneAndUpdate({ _id: _id }, { inviteToken: "" });
    commonHelper.sendResponse(res, 'success', null, userMessage.revokeInvite);
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


const cometChatLog = async (req, res) => {
    try {
      let chatLog = new cometChatLogModel(req.body);
      await chatLog.save();
      commonHelper.sendResponse(res, 'success', '' , 'Log saved successfully');
    } catch (error) {
      console.log("*******cometChatLog******", error)
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
  changeProfileImage,
  getDefaultDirectories,
  getDirectoryItems,
  createDirectory,
  updateDirectory,
  removeDirectoryOrFile,
  previewDocumentFile,
  updateFile,
  uploadDocumentFile,
  cometChatLog,
  resendInvite,
  revokeInvite
};