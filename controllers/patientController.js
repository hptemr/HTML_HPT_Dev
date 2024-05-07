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

const signup = async (req, res) => {
    try {
        const { query, data } = req.body;
        console.log('query>>>', query)
        console.log(data.email, 'data>>>', data)

        let alreadyPatient = await Patient.findOne({ email: data.email });
        let found = [];
        if(query._id){
            found = await PatientTemp.findOne({ _id: query._id });
        }else{
            found = await PatientTemp.findOne({ email: data.email });
        }
        let result_id = '';
       // console.log('alreadyPatient >>>', alreadyPatient, '   found>>>', found)
        if(alreadyPatient){
            commonHelper.sendResponse(res, 'error', null, userMessage.emailExist);
        }else{
            let result = {};
            if (found) {
                result = await PatientTemp.updateOne({ _id: found._id }, { $set: data });
                result_id = found._id
            } else {
                let newPatient = new PatientTemp(data);
                result = await newPatient.save();
                result_id = result._id;
            }
            console.log('result _id>>>', result_id)

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
            commonHelper.sendResponse(res, 'success', result_id, commonMessage.login);
        }
    } catch (error) {
        console.log('query>>>', error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};

const getPatientList = async (req, res) => {
    try {
        const { query, params, order, offset, limit } = req.body;
        let patientList = await Patient.find(query, params).sort(order).skip(offset).limit(limit);
        let totalCount = await Patient.find(query).count()
        commonHelper.sendResponse(res, 'success', { patientList, totalCount }, '');
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const uploadPatientDocument2 = async (req, res) => {

}

const patientFilePath = constants.s3Details.patientDocumentFolderPath;

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
  
const uploadPatientDocument = async function(req,res){
    try {
        var fstream;
        let authTokens = { authCode: "" }
            if (req.busboy) {
                req.busboy.on('field',async function (fieldname, val, something, encoding, mimetype) {
                    authTokens[fieldname] = val
                })
                const {query:{userId}} = req;
                req.busboy.on('file',async function (fieldname, file, fileObj) {
                    let restmpallfiles = {};
                    let oldTmpFiles = [];
                    if(userId){
                       let result = await PatientTemp.findOne({ _id: userId });
                         if (result) {   
                            if(result.document_temp_name)  {
                                await s3.deleteFile(patientFilePath+userId+'/',result.document_temp_name);
                            }
                            let filename = fileObj.filename;
                            let encoding = fileObj.encoding;
                            let mimetype = fileObj.mimeType;
                            let ext = filename.split('.')
                            ext = ext[ext.length - 1];
                            var fileExts = ["jpg", "jpeg", "png", "txt", "pdf", "docx", "doc"];
                            let resp = isExtension(ext,fileExts);
                            if(resp) {          
                                const newFilename = new Date().getTime() + `.${ext}`
                                fstream = fs.createWriteStream(__dirname + '/../tmp/' + newFilename)
                                file.pipe(fstream);
                                fstream.on('close', async function () {
                                    let s3Response = await s3.uploadPrivateFile(newFilename,patientFilePath+userId+'/',mimetype);
                                    let uploadDocs =  { "document_name": filename,"document_temp_name":newFilename }
                                    restmpallfiles = oldTmpFiles;
                                    await PatientTemp.updateOne({ _id: userId }, { $set: uploadDocs });
                                    let results = { userId:userId, filepath:constants.s3Details.url+patientFilePath+userId+'/'+newFilename }                                        
                                    commonHelper.sendResponse(res, 'success', results, 'File Upload Successfully!');
                                })
                            }else{
                                commonHelper.sendResponse(res, 'error', null, "Invalid file extension!");
                            }
                        }
                    } else {
                        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
                    }
                })
            }
        } catch (error) {
            console.log('>>>>>>>>>>>>>>>> error  >>>>>>>>',error)
            commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
        }
}

module.exports = {
    signup,
    getPatientList,
    uploadPatientDocument
};