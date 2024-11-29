require('dotenv').config();
var express = require('express')
var router = express.Router()
var cors = require('cors')
const Busboy = require('busboy')
const { userMessage, commonMessage, infoMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const userCommonHelper = require('../helpers/userCommon');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const PatientTemp = require('../models/patientTempModel');
const Patient = require('../models/patientModel');
let ObjectId = require('mongoose').Types.ObjectId;
const triggerEmail = require('../helpers/triggerEmail');
var fs = require('fs')
const s3 = require('./../helpers/s3Upload')
var constants = require('./../config/constants')
const patientFilePath = constants.s3Details.patientDocumentFolderPath;
const s3Details = constants.s3Details;
const tebraController = require('../controllers/tebraController');
const Case = require('../models/casesModel');


const signup = async (req, res) => {
    try {
        const { query, step, data, patientIdRegisterByRefferal } = req.body;
        let alreadyPatient = ''; let alreadyAdmin = '';
        const pendingPatient = await Patient.findOne({ email: data.email,status:"Pending",signupToken: {$ne: null} });
        if (data.email && !pendingPatient) {
            alreadyPatient = await Patient.findOne({ email: data.email,status:"Active" });
        }
    
        // if(data.email){
        //     alreadyAdmin = await User.findOne({ email: data.email });
        // }
        let found = [];
        // This conditon for patient register through refferal appointment
        // if(data.patientEmailGetByToken && step==1){
        //     found = await PatientTemp.findOne({ email: data.patientEmailGetByToken });
        // }
        // else 
        
        if (query._id) {
            found = await PatientTemp.findOne({ _id: query._id });
        } else {
            found = await PatientTemp.findOne({ email: data.email });
        }
        let result_id = ''; let userData = ''; let message = '';
        // if(alreadyAdmin){
        //     let validations = {'email':userMessage.adminEmailExist}
        //     commonHelper.sendResponse(res, 'errorValidation', validations,'Please check the validation field.' );
        // }else 

        if (alreadyPatient) {
            let validations = { 'email': userMessage.patientEmailExist }
            commonHelper.sendResponse(res, 'errorValidation', validations, 'Please check the validation field.');
        }else {
            let result = {};
            if (data.password) {
                data.salt = await bcrypt.genSalt(10);
                data.hash_password = await bcrypt.hash(data.password, data.salt);
            }

            if (found) {
                if (step == 3) {
                    let request_data = {
                        firstName: found.firstName,
                        middleName: found.middleName,
                        lastName: found.lastName,
                        email: found.email,
                        dob: found.dob,
                        gender: found.gender,
                        phoneNumber: found.phoneNumber,
                        salt: found.salt,
                        hash_password: found.hash_password,
                        address1: found.address1,
                        address2: found.address2,
                        city: found.city,
                        state: found.state,
                        zipcode: found.zipcode,
                        documents_type: found.documents_type ? found.documents_type : data.documents_type,
                        document_name: found.document_name,
                        document_temp_name: found.document_temp_name,
                        document_size: found.document_size,
                        acceptConsent: found.acceptConsent ? found.acceptConsent : data.acceptConsent,
                        signupToken:'',
                        status: 'Active'
                    }
                    const pendingPatientTemp = await Patient.findOne({ signupToken: found.signupToken,status:"Pending" });
            
                    if(pendingPatientTemp){
                        // Patient Register through referral
                        // const filterPatient = { _id: new ObjectId(patientIdRegisterByRefferal) };
                        // const updatePatient = { $set: request_data };
                        // let optionsUpdatePatient = { returnOriginal: false };
                        // result = await Patient.findOneAndUpdate(filterPatient, updatePatient, optionsUpdatePatient);
                        const filterPatient = { _id: pendingPatientTemp._id };
                        const updatePatient = { $set: request_data };
                        let optionsUpdatePatient = { returnOriginal: false };
                        result = await Patient.findOneAndUpdate(filterPatient, updatePatient, optionsUpdatePatient);

                        // Register patient on Tebra (By register link)
                        let caseOutput = await Case.find({ patientId: result._id }).lean();
                        if(found.signupToken && !result?.patientOnTebra && caseOutput.length){   
                            console.log("<<< Patient Register on tebra >>>>")
                            let isPatientCreated = await tebraController.createPatient(result).catch((_err)=>false)
                            if(isPatientCreated){
                                console.log("caseOutput>>>>",caseOutput)
                                let caseData = caseOutput[0]
                                console.log("caseData>>>>",caseData)
                                const patientDataAfterCreated = await Patient.findOne({ _id: pendingPatientTemp._id }).lean();
                                if(patientDataAfterCreated!=null && patientDataAfterCreated?.patientOnTebra && !caseData?.caseCreatedOnTebra){
                                    tebraController.createCase(patientDataAfterCreated, caseData.caseName, caseData._id)
                                }
                            }
                        }
                    }else{
                       // Normal patient register
                        let newPatient = new Patient(request_data);
                        result = await newPatient.save();
                    }

                    if (result && result._id) {
                        result_id = result._id;
                        const token = jwt.sign({ _id: result_id }, process.env.SECRET, { expiresIn: '1d' });
                        userData = {
                            _id: result_id,
                            firstName: found.firstName,
                            middleName: found.middleName,
                            lastName: found.lastName,
                            email: found.email,
                            role: 'patient',
                            token: token,
                            loginCount: 1,
                            profileImage: 'default.png',
                            gender: found.gender,
                            dob: found.dob,
                            phoneNumber: found.phoneNumber,
                            cellPhoneNumber: found.cellPhoneNumber ? found.cellPhoneNumber : "",
                            workExtensionNumber: found.workExtensionNumber ? found.workExtensionNumber : "",
                            maritalStatus: found.maritalStatus ? found.maritalStatus : "",

                        };
                        
                        if (found.email) {
                            await PatientTemp.deleteOne({ _id: found._id });
                            let email_data = {
                                firstName: found.firstName,
                                email: found.email,
                                link: constants.clientUrl
                            }
                            triggerEmail.patientSignup('patientsignup', email_data)
                        }
                        message = userMessage.patientSignup;
                    }

                } else {
                    result = await PatientTemp.updateOne({ _id: found._id }, { $set: data });
                    result_id = found._id;
                }
            } else {
                let newPatient = new PatientTemp(data);
                result = await newPatient.save();
                result_id = result._id;
            }
            let responsedata = { 'user_id': result_id, 'userData': userData };
            commonHelper.sendResponse(res, 'success', responsedata, message);
        }
    } catch (error) {
        console.log('query>>>', error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};

const getPatientList = async (req, res) => {
    try {
        const { queryMatch, fields, order, offset, limit } = req.body;
        // let totalCount = await Patient.countDocuments([{
        //     $lookup:
        //     {
        //         from: "appointments",
        //         localField: "_id",
        //         foreignField: "patientId",
        //         as: "appmnt"
        //     }
        // }, {
        //     $match: queryMatch
        // }, {
        //     $project: fields
        // }])
       

        // let patientList = await Patient.aggregate([{
        //     $lookup:
        //     {
        //         from: "appointments",
        //         localField: "_id",
        //         foreignField: "patientId",
        //         as: "appmnt"
        //     }
        // }, {
        //     $match: queryMatch
        // }, {
        //     $project: fields
        // }]).sort(order).skip(offset).limit(limit)
        // commonHelper.sendResponse(res, 'success', { patientList, totalCount }, '');

        let result = await Patient.aggregate([{
            $lookup:
            {
                from: "appointments",
                localField: "_id",
                foreignField: "patientId",
                as: "appmnt"
            }
        }, {
            $match: queryMatch
        }, {
            $project: fields
        },
        {
            $sort: order
        },
        {
            $facet: {
              data: [
                { $skip: offset },
                { $limit: limit }
              ],
              totalCount: [
                { $count: "count" }
              ]
            }
          }
        ])

        const patientList = result[0].data;
        const totalCount = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
        commonHelper.sendResponse(res, 'success', { patientList, totalCount }, '');
    } catch (error) {
        console.log("********error*********", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const searchPatientList = async (req, res) => {
    try {
        const { query, fields, order } = req.body;
        const result = await Patient.find(query,fields).sort(order);

        const patientList = result;     
        commonHelper.sendResponse(res, 'success', { patientList }, '');
    } catch (error) {
        console.log("********error*********", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
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

const uploadPatientDocument = async function (req, res) {
    try {
        var fstream;
        let authTokens = { authCode: "" }
        if (req.busboy) {
            req.busboy.on('field', async function (fieldname, val, something, encoding, mimetype) {
                authTokens[fieldname] = val
            })
            const { query: { userId, type } } = req;
            req.busboy.on('file', async function (fieldname, file, fileObj) {
                let fileSize = 0;
                if (userId) {
                    let result = '';
                    if (type && type == 'Patient') {
                        result = await Patient.findOne({ _id: userId });
                    } else {
                        result = await PatientTemp.findOne({ _id: userId });
                    }

                    if (result) {
                        if (result.document_temp_name) {
                            await s3.deleteFile(patientFilePath + '/', result.document_temp_name);
                        }
                        let filename = fileObj.filename;
                        fileSize = fileObj.encoding;
                        let mimetype = fileObj.mimeType;
                        let ext = filename.split('.')
                        ext = ext[ext.length - 1];
                        var fileExts = ["jpg", "jpeg", "png", "txt", "pdf", "docx", "doc"];
                        let resp = isExtension(ext, fileExts);
                        if (resp) {
                            const newFilename = new Date().getTime() + `.${ext}`
                            fstream = fs.createWriteStream(__dirname + '/../tmp/' + newFilename)
                            file.pipe(fstream);
                            fstream.on('close', async function () {
                                let s3Response = await s3.uploadPrivateFile(newFilename, patientFilePath, mimetype);
                                if (s3Response.size) {
                                    fileSize = await bytesToMB(s3Response.size);
                                }
                                let uploadDocs = { "document_name": filename, "document_temp_name": newFilename, document_size: fileSize }
                                if (type && type == 'Patient') {
                                    await Patient.updateOne({ _id: userId }, { $set: uploadDocs });
                                } else {
                                    await PatientTemp.updateOne({ _id: userId }, { $set: uploadDocs });
                                }
                                let results = { userId: userId, filepath: constants.s3Details.url + patientFilePath, filename: newFilename, original_name: filename, document_size: fileSize }
                                commonHelper.sendResponse(res, 'success', results, 'File Upload Successfully!');
                            })
                        } else {
                            commonHelper.sendResponse(res, 'error', null, "Invalid file extension!");
                        }
                    }
                } else {
                    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
                }
            })
        }
    } catch (error) {
        console.log('>>>>>>>>>>>>>>>> error  >>>>>>>>', error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

function bytesToMB(bytes) {
    let doc_size = '';
    if (bytes > 999999) {
        doc_size = (bytes / (1024 * 1024)).toFixed(2);
        doc_size = doc_size + ' MB';
    } else {
        doc_size = (bytes / 1000).toFixed(2);
        doc_size = doc_size + ' KB';
    }

    return doc_size;
}

async function previewDocument(req, res) {
    let { query,filePath } = req.body;
    let { fileName } = req.body;

    let documentLink = ''; let fileSize = '';
    if (fileName) {

        let path = patientFilePath + fileName;
        if(filePath){
            path = filePath + fileName;
        }
        try {
            const url = await s3.s3.getSignedUrl('getObject', {
                Bucket: constants.s3Details.bucketName,
                Key: path,
                Expires: 100,
            });

            const params = {
                Bucket: constants.s3Details.bucketName,
                Key: path
            };
            const size = await s3.s3.headObject(params).promise();
            if (size.ContentLength) {
                fileSize = await bytesToMB(size.ContentLength);
            }
            documentLink = url;
        } catch (error) {
            documentLink = ''; fileSize = '';
        }
    }

    let results = { 'document': documentLink, document_size: fileSize };
    //console.log('results>>>',results)
    commonHelper.sendResponse(res, 'success', results, 'Get file successfully!');
}

const deleteDocument = async (req, res) => {
    try {
        const { query, type } = req.body;
        let found = '';
        if (type && type == 'Patient') {
            found = await Patient.findOne({ _id: query._id });
        } else {
            found = await PatientTemp.findOne({ _id: query._id });
        }
        if (found && found.document_temp_name) {
            await s3.deleteFile(patientFilePath, found.document_temp_name);
            let deleteDocs = { "document_name": '', "document_temp_name": '', "document_size": '' }

            if (type == 'Patient') {
                await Patient.updateOne({ _id: found._id }, { $set: deleteDocs });
            } else {
                await PatientTemp.updateOne({ _id: found._id }, { $set: deleteDocs });
            }

            commonHelper.sendResponse(res, 'success', null, 'Document deleted successfully!');
        } else {
            commonHelper.sendResponse(res, 'error', null, 'Record not found.');
        }
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, 'Invalid request. ' + error);
    }
}


const getPatientData = async (req, res) => {
    try {
        const { query, fields } = req.body;
        let patientData = await Patient.findOne(query, fields);
        commonHelper.sendResponse(res, 'success', { patientData }, '');
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const updateProfile = async (req, res) => {
    try {
        const { query, data, steps } = req.body;
        let found = await Patient.findOne(query);
        console.log('patient  data  >>>', data)
        if (found) {
            let res = await Patient.updateOne({ _id: found._id }, { $set: data });
            //console.log('*** res **** ',res)

            // Update patient information on Tebra
            if(found?.patientOnTebra && found?.tebraDetails){
                if(steps==0) { tebraController.updatePatientPersonalInfo(data, found) }
                if(steps==1) { tebraController.updatePatientAdditionalInfo(data, found) }
            }
        }

        commonHelper.sendResponse(res, 'success', { found }, '');
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

changeProfileImage = async (req, res) => {
    try {
      const { userId, profileImage,imageName } = req.body
      var profileImagePath = constants.s3Details.profileImageFolderPath;
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
        await Patient.updateOne({ _id: userId }, { profileImage: filename });
        commonHelper.sendResponse(res, 'success', filename , userMessage.profileImageChanged);
      } else {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
      }
    } catch (error) {
      console.log("*******error******", error)
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  }

  const deleteProfileImage = async (req, res) => {
    try {
      const { userId } = req.body
      await s3.deleteFile(s3Details.profileImageFolderPath, userId + '.png')
      await Patient.findOneAndUpdate({ _id: userId }, { profileImage: s3Details.defaultProfileImageName });
      commonHelper.sendResponse(res, 'success', s3Details.defaultProfileImageName, userMessage.profileImageRemoved);
    } catch (error) {
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  }

  const changePassword = async (req, res, next) => {
    try {
      const _id = req.body.userId
      const { confirmPassword } = req.body;
      let userData = await Patient.findOne({ _id });
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
      await Patient.findOneAndUpdate(filter, updateDoc, options);
      commonHelper.sendResponse(res, 'success', null, infoMessage.passwordChange);
    } catch (error) {
      console.log("changePassword error>>>>", error)
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  }

  const getPatientSignupToken = async (req, res) => {
    try {
        const { query,fields } = req.body;
        //let patientData = ''; 
        const patientData = await Patient.findOne(query,fields);
        if(patientData){
            commonHelper.sendResponse(res, 'success', patientData, '');   
        }else{
            commonHelper.sendResponse(res, 'errorValidation', null, infoMessage.linkExpired);
        }

    } catch (error) {
      console.log("changePassword error>>>>", error)
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
  }
module.exports = {
    signup,
    getPatientList,
    uploadPatientDocument,
    previewDocument: previewDocument,
    deleteDocument: deleteDocument,
    getPatientData,
    updateProfile,
    changeProfileImage,
    deleteProfileImage,
    changePassword,
    searchPatientList,
    getPatientSignupToken
};