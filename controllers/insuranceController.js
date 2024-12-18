const { commonMessage, appointmentMessage,insuranceMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const Insurance = require('../models/insuranceModel');
const s3 = require('./../helpers/s3Upload')
var constants = require('./../config/constants')
let ObjectId = require('mongoose').Types.ObjectId;
const s3Details = constants.s3Details;
const getInsuranceList = async (req, res) => {
    try {
        const { query, fields, order, offset, limit } = req.body;
        let insuranceList = await Insurance.find(query, fields)
            .sort(order).skip(offset).limit(limit)
        let totalCount = await Insurance.find(query).countDocuments()
        commonHelper.sendResponse(res, 'success', { insuranceList, totalCount }, '');
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}


const getInsuranceDetails = async (req, res) => {
    try {
        const { query, fields } = req.body;
        let insuranceData = await Insurance.findOne(query, fields).collation({ locale: 'en', strength: 2 })
        commonHelper.sendResponse(res, 'success', { insuranceData }, '');
    } catch (error) {
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const addInsurance = async (req, res) => {
    try {
        const { uploadedInsuranceFiles} = req.body;
        let newRecord = new Insurance(req.body)
        await newRecord.save();

        if (uploadedInsuranceFiles && uploadedInsuranceFiles.length > 0) {
            await s3UploadDocuments(req, res)
        }
        commonHelper.sendResponse(res, 'success', null, insuranceMessage.created);
    } catch (error) {
        console.log('add Insurance error>>>',error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}

const updateInsurance = async (req, res) => {
    try {
        const { query, data ,uploadedInsuranceFiles} = req.body;
        
        let result = await Insurance.findOneAndUpdate({ _id: query._id }, data);
        if (uploadedInsuranceFiles && uploadedInsuranceFiles.length > 0) {
            await s3UploadDocuments(req, res)
        }
        if(result){
            commonHelper.sendResponse(res, 'success', null, insuranceMessage.updated);
        }else{
            commonHelper.sendResponse(res, 'success', null, commonMessage.wentWrong);
        }        
    } catch (error) {
        console.log('update Insurance error>>>',error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}



async function s3UploadDocuments(req, res) {
    let uploadedInsuranceFiles = req.body.uploadedInsuranceFiles
    if (uploadedInsuranceFiles && uploadedInsuranceFiles.length > 0) {
        var s3InsurancePath = constants.s3Details.patientInsuranceFolderPath;
        for (let i = 0; i < uploadedInsuranceFiles.length; i++) {
            if (uploadedInsuranceFiles[i].data && uploadedInsuranceFiles[i].data != '') {
                let fileName = uploadedInsuranceFiles[i].name
                let fileSelected = uploadedInsuranceFiles[i].data
                let fileBuffer = new Buffer(fileSelected.replace(fileSelected.split(",")[0], ""), "base64");
                let params = {
                    ContentEncoding: "base64",
                    //ACL: "bucket-owner-full-control",
                    ACL: "public-read",
                    ContentType: fileSelected.split(";")[0],
                    Bucket: constants.s3Details.bucketName,
                    Body: fileBuffer,
                    Key: `${s3InsurancePath}${fileName}`,
                };
                await s3.uploadFileNew(params)
            }
        }
    }
}

module.exports = {
    addInsurance,
    updateInsurance,
    getInsuranceList,
    getInsuranceDetails,
};