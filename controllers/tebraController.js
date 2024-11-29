require('dotenv').config();
const commonHelper = require('../helpers/common');
const { commonMessage } = require('../helpers/message');
const axios = require('axios');
const xml2js = require('xml2js');
const tebraCommon = require('../helpers/tebraCommon');
const { tebraCredentials } = require('./../config/constants')
const tebraSoapRequest = require('../helpers/tebraSoapRequest');
let ObjectId = require('mongoose').Types.ObjectId;
const Patient = require('../models/patientModel');
const Case = require('../models/casesModel');

// const GetPractices = async (req, res) => {
//     try {
//         // Tebra API key
//         const customerKey = 'n87kg43ms26w';
//         const user = 'ahptehr@gmail.com';
//         const password = 'Arkenea@2024';
//         const wsdlUrl = 'https://webservice.kareo.com/services/soap/2.1/KareoServices.svc';
//         const soapAction = 'http://www.kareo.com/api/schemas/KareoServices/GetPractices'

//         const soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.kareo.com/api/schemas/">
//                             <soapenv:Header/>
//                             <soapenv:Body>
//                                 <sch:GetPractices>
//                                     <sch:request>
//                                         <sch:RequestHeader>
//                                         <sch:CustomerKey>${customerKey}</sch:CustomerKey>
//                                         <sch:Password>${password}</sch:Password>
//                                         <sch:User>${user}</sch:User>
//                                         </sch:RequestHeader>
//                                         <sch:Fields>
//                                         <sch:PracticeName>true</sch:PracticeName>
//                                         </sch:Fields>
//                                         <sch:Filter>
//                                         <sch:PracticeName></sch:PracticeName>
//                                         </sch:Filter>
//                                     </sch:request>
//                                 </sch:GetPractices>
//                             </soapenv:Body>
//                         </soapenv:Envelope>`

//                     axios.post(wsdlUrl, soapRequest, {
//                         headers: {
//                             'Content-Type': 'text/xml;charset=UTF-8',
//                             'SOAPAction': soapAction
//                         }
//                     }).then(response => {
//                         console.log('Response >>>>>:', response);
//                         console.log('Response Data>>>>:', response.data);

//                         xml2js.parseString(response.data, { explicitArray: false }, (err, result) => {
//                             if (err) {
//                                console.error('Error parsing XML:', err);
//                             } else {
                               
//                                 const practicesResponse = result['s:Envelope']['s:Body']['GetPracticesResponse']['GetPracticesResult']['Practices'];
//                                 console.log('practicesResponse:', practicesResponse);
//                                 const errorResponse = result['s:Envelope']['s:Body']['GetPracticesResponse']['GetPracticesResult']['ErrorResponse'];
//                                 console.log('errorResponse:', errorResponse);
//                                 // const practiceName = result['s:Envelope']['s:Body']['GetPracticesResponse']['GetPracticesResult']['Practices']['PracticeData']['PracticeName'];
//                             }
//                         });
                        
//                     }).catch(error => {
//                         console.error('Error:', error);
//                     });

//                 commonHelper.sendResponse(res, 'success', null, "Practices get successfully");

//     } catch (error) {
//         console.log("========GetPractices=========", error)
//         commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
//     }
// };


const getPractices = async (req, res) => {
    try {
        const soapAction = 'http://www.kareo.com/api/schemas/KareoServices/GetPractices'
        const soapRequest = tebraSoapRequest.getPracice()
        const requestHeaders =  tebraCommon.requestHeader(soapAction)

        axios.post(tebraCredentials?.wsdlUrl, soapRequest, requestHeaders ).then(response => {
            // console.log('Response >>>>>:', response);
            console.log('Response Data>>>>:', response.data);

            let { parseError, parseResult} = tebraCommon.parseXMLResponse(response.data)
            if(!parseError){
                const errorResponse = parseResult['s:Envelope']['s:Body']['GetPracticesResponse']['GetPracticesResult']['ErrorResponse'];
                console.log('errorResponse:', errorResponse);
                if(errorResponse && errorResponse?.IsError=='false'){
                    const Practices = parseResult['s:Envelope']['s:Body']['GetPracticesResponse']['GetPracticesResult']['Practices'];
                    const practicesAuthorized = parseResult['s:Envelope']['s:Body']['GetPracticesResponse']['GetPracticesResult']['SecurityResponse']['PracticesAuthorized'];
                    console.log("practicesAuthorized>>>",practicesAuthorized)
                    const aInt = practicesAuthorized.PracticeID["a:int"];
                    let practiceData = {
                        Practices,
                        PracticeID: Array.isArray(aInt)?practicesAuthorized.PracticeID["a:int"].map(Number):parseInt(practicesAuthorized.PracticeID['a:int'], 10)
                    }
                    commonHelper.sendResponse(res, 'success', practiceData, "Practices get successfully");
                } 
            }

        }).catch(error => {
            console.error('API Error:', error);
            commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
        });

    } catch (error) {
        console.log("========GetPractices=========", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};

const createPatient =  (patientData) => {
    return new Promise( function (resolve, reject) {
        try {
            const soapAction = 'http://www.kareo.com/api/schemas/KareoServices/CreatePatient'
            const soapRequest = tebraSoapRequest.createPatient(patientData)
            const requestHeaders =  tebraCommon.requestHeader(soapAction)

            console.log("soapRequest>>>>",soapRequest)

            axios.post(tebraCredentials?.wsdlUrl, soapRequest, requestHeaders ).then(async response => {
                console.log('Response >>>>>:', response);
                console.log('Response Data>>>>:', response.data);

                let { parseError, parseResult} = tebraCommon.parseXMLResponse(response.data)
                console.log("parseResult>>>>",parseResult)
                if(!parseError){
                    const errorResponse = parseResult['s:Envelope']['s:Body']['CreatePatientResponse']['CreatePatientResult']['ErrorResponse'];
                    if(errorResponse && errorResponse?.IsError=='false'){
                        const patientTebraRes = parseResult['s:Envelope']['s:Body']['CreatePatientResponse']['CreatePatientResult'];

                        // Save tebra response object in patient collection
                        let insertObject ={
                            'tebraDetails':{
                                PatientID: patientTebraRes.PatientID,
                                PracticeID: patientTebraRes.PracticeID,
                                PracticeName: patientTebraRes.PracticeName
                            },
                            patientOnTebra: true
                        }
                        console.log("patientData._id>>>>",patientData._id)
                        console.log("insertObject>>>>",insertObject)
                        await Patient.updateOne({ _id: patientData._id }, { $set: insertObject });

                        console.log('========Patient created successfully=========:',patientTebraRes);

                    }
                }
                // Tebra Logs
                tebraCommon.tebraApiLog('createPatient',soapRequest,parseResult,'success',{patientId:patientData._id},'')
                resolve(true)
            }).catch(error => {
                console.error('========createPatient API Error=========:', error);
                tebraCommon.tebraApiLog('createPatient',soapRequest,'','apiError',{patientId:patientData._id},error)
                reject()
            });

        } catch (error) {
            console.log("========createPatient=========:", error)
            tebraCommon.tebraApiLog('createPatient',soapRequest,'','catchError',{patientId:patientData._id},error)
            reject()
        }
    })
};


const updatePatientPersonalInfo = async (patientData, patient) => {
    try {
        const soapAction = 'http://www.kareo.com/api/schemas/KareoServices/UpdatePatient'
        const soapRequest = tebraSoapRequest.updatePatientPersonalInfo(patientData, patient.tebraDetails)
        const requestHeaders =  tebraCommon.requestHeader(soapAction)
        let patientDataForLogs = { 'patientId': patient._id}

        console.log("soapRequest>>>>",soapRequest)

        axios.post(tebraCredentials?.wsdlUrl, soapRequest, requestHeaders ).then(async response => {
            console.log('Response >>>>>:', response);
            console.log('Response Data>>>>:', response.data);

            let { parseError, parseResult} = tebraCommon.parseXMLResponse(response.data)
            console.log("parseResult>>>>",parseResult)
            if(!parseError){
                const errorResponse = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult']['ErrorResponse'];
                if(errorResponse && errorResponse?.IsError=='false'){
                    const patientTebraRes = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult'];

                    console.log('========Patient updated successfully=========:',patientTebraRes);
                }
            }
            // Tebra Logs
            tebraCommon.tebraApiLog('updatePatientPersonalInfo',soapRequest,parseResult,'success',patientDataForLogs,'')
        }).catch(error => {
            console.error('========updatePatient API Error=========:', error);
            tebraCommon.tebraApiLog('updatePatientPersonalInfo',soapRequest,'','apiError',patientDataForLogs,error)
        });

    } catch (error) {
        console.log("========updatePatient=========:", error)
        tebraCommon.tebraApiLog('updatePatientPersonalInfo',soapRequest,'','catchError',patientDataForLogs,error)
    }
};


const updatePatientAdditionalInfo = async (patientData, patient) => {
    try {
        const soapAction = 'http://www.kareo.com/api/schemas/KareoServices/UpdatePatient'
        const soapRequest = tebraSoapRequest.updatePatientAdditionalInfo(patientData, patient.tebraDetails)
        const requestHeaders =  tebraCommon.requestHeader(soapAction)
        let patientDataForLogs = { 'patientId': patient._id}

        console.log("soapRequest>>>>",soapRequest)

        axios.post(tebraCredentials?.wsdlUrl, soapRequest, requestHeaders ).then(async response => {
            console.log('Response >>>>>:', response);
            console.log('Response Data>>>>:', response.data);

            let { parseError, parseResult} = tebraCommon.parseXMLResponse(response.data)
            console.log("parseResult>>>>",parseResult)
            if(!parseError){
                const errorResponse = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult']['ErrorResponse'];
                if(errorResponse && errorResponse?.IsError=='false'){
                    const patientTebraRes = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult'];

                    console.log('========Patient updated successfully=========:',patientTebraRes);
                }
            }
            // Tebra Logs
            tebraCommon.tebraApiLog('updatePatientAdditionalInfo',soapRequest,parseResult,'success',patientDataForLogs,'')
        }).catch(error => {
            console.error('========updatePatient API Error=========:', error);
            tebraCommon.tebraApiLog('updatePatientAdditionalInfo',soapRequest,'','apiError',patientDataForLogs,error)
        });

    } catch (error) {
        console.log("========updatePatient=========:", error)
        tebraCommon.tebraApiLog('updatePatientAdditionalInfo',soapRequest,'','catchError',patientDataForLogs,error)
    }
};


const updatePatientIntakeFormPersonalInfo = async (patientData, patient) => {
    try {
        const soapAction = 'http://www.kareo.com/api/schemas/KareoServices/UpdatePatient'
        const soapRequest = tebraSoapRequest.updatePatientIntakeFormPersonalInfo(patientData, patient.tebraDetails)
        const requestHeaders =  tebraCommon.requestHeader(soapAction)
        let patientDataForLogs = { 'patientId': patient._id , patientData: patientData}

        console.log("soapRequest>>>>",soapRequest)

        axios.post(tebraCredentials?.wsdlUrl, soapRequest, requestHeaders ).then(async response => {
            console.log('Response >>>>>:', response);
            console.log('Response Data>>>>:', response.data);

            let { parseError, parseResult} = tebraCommon.parseXMLResponse(response.data)
            console.log("parseResult>>>>",parseResult)
            if(!parseError){
                const errorResponse = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult']['ErrorResponse'];
                if(errorResponse && errorResponse?.IsError=='false'){
                    const patientTebraRes = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult'];

                    console.log('========Patient updated successfully=========:',patientTebraRes);
                }
            }
            // Tebra Logs
            tebraCommon.tebraApiLog('updatePatientIntakeFormPersonalInfo',soapRequest,parseResult,'success',patientDataForLogs,'')
        }).catch(error => {
            console.error('========updatePatientIntakeFormPersonalInfo API Error=========:', error);
            tebraCommon.tebraApiLog('updatePatientIntakeFormPersonalInfo',soapRequest,'','apiError',patientDataForLogs,error)
        });

    } catch (error) {
        console.log("========updatePatientIntakeFormPersonalInfo=========:", error)
        tebraCommon.tebraApiLog('updatePatientIntakeFormPersonalInfo',soapRequest,'','catchError',patientDataForLogs,error)
    }
};


const addPatientInsuranceIntakeForm = async (insuranceInfo, patient, tebraCaseDetails) => {
    try {
        const soapAction = 'http://www.kareo.com/api/schemas/KareoServices/UpdatePatient'
        const soapRequest = tebraSoapRequest.addPatientInsuranceIntakeForm(insuranceInfo, patient, tebraCaseDetails)
        const requestHeaders =  tebraCommon.requestHeader(soapAction)
        let patientDataForLogs = { 'patientId': patient._id }

        console.log("soapRequest>>>>",soapRequest)

        axios.post(tebraCredentials?.wsdlUrl, soapRequest, requestHeaders ).then(async response => {
            console.log('Response >>>>>:', response);
            console.log('Response Data>>>>:', response.data);
            let { parseError, parseResult} = tebraCommon.parseXMLResponse(response.data)
            console.log("parseResult>>>>",parseResult)
            if(!parseError){
                const errorResponse = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult']['ErrorResponse'];
                if(errorResponse && errorResponse?.IsError=='false'){
                    const patientTebraRes = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult'];

                    console.log('========Patient updated successfully=========:',patientTebraRes);

                    const caseRes = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult']['Cases']['PatientCaseRes'];
                    const insuranceRes = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult']['Cases']['PatientCaseRes']['Policies']['InsurancePolicyRes'];
                    console.log('========insuranceRes=========:',insuranceRes);
                    // Save tebra response object in case collection
                    let insertObject = {
                        'tebraInsuranceData':{
                            InsurancePolicyCompanyID: insuranceRes?.InsurancePolicyCompanyID,
                            InsurancePolicyID: insuranceRes?.InsurancePolicyID,
                            InsurancePolicyPlanID: insuranceRes?.InsurancePolicyPlanID
                        },
                        insuranceAddedOnTebra: true
                    }
                    console.log("insertObject>>>>",insertObject)
                    console.log("caseId>>>>",caseRes?.CaseID)
                    await Case.updateOne({ 'tebraDetails.CaseID': caseRes?.CaseID }, { $set: insertObject });
                }
            }
            // Tebra Logs
            tebraCommon.tebraApiLog('addPatientInsuranceIntakeForm',soapRequest,parseResult,'success',patientDataForLogs,'')
        }).catch(error => {
            console.error('========addPatientInsuranceIntakeForm API Error=========:', error);
            tebraCommon.tebraApiLog('addPatientInsuranceIntakeForm',soapRequest,'','apiError',patientDataForLogs,error)
        });

    } catch (error) {
        console.log("========addPatientInsuranceIntakeForm=========:", error)
        tebraCommon.tebraApiLog('addPatientInsuranceIntakeForm',soapRequest,'','catchError',patientDataForLogs,error)
    }
};


const manageAuthorization = async (authorizationData, patient, tebraCaseDetails, tebraInsuranceData) => {
    try {
        const soapAction = 'http://www.kareo.com/api/schemas/KareoServices/UpdatePatient'
        const soapRequest = tebraSoapRequest.manageAuthorization(authorizationData, patient, tebraCaseDetails, tebraInsuranceData )
        const requestHeaders =  tebraCommon.requestHeader(soapAction)
        let patientDataForLogs = { 'patientId': patient._id }

        console.log("soapRequest>>>>",soapRequest)

        axios.post(tebraCredentials?.wsdlUrl, soapRequest, requestHeaders ).then(async response => {
            console.log('Response >>>>>:', response);
            console.log('Response Data>>>>:', response.data);
            let { parseError, parseResult} = tebraCommon.parseXMLResponse(response.data)
            console.log("parseResult>>>>",parseResult)
            if(!parseError){
                const errorResponse = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult']['ErrorResponse'];
                if(errorResponse && errorResponse?.IsError=='false'){
                    const patientTebraRes = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult'];

                    console.log('========Patient updated successfully=========:',patientTebraRes);
                }
            }
            // Tebra Logs
            tebraCommon.tebraApiLog('manageAuthorization',soapRequest,parseResult,'success',patientDataForLogs,'')
        }).catch(error => {
            console.error('========manageAuthorization API Error=========:', error);
            tebraCommon.tebraApiLog('manageAuthorization',soapRequest,'','apiError',patientDataForLogs,error)
        });

    } catch (error) {
        console.log("========manageAuthorization=========:", error)
        tebraCommon.tebraApiLog('manageAuthorization',soapRequest,'','catchError',patientDataForLogs,error)
    }
};


const addBillingTeamPatientInsurance = async (insuranceInfo, patient, tebraCaseDetails, tebraInsuranceData) => {
    try {
        const soapAction = 'http://www.kareo.com/api/schemas/KareoServices/UpdatePatient'
        const soapRequest = tebraSoapRequest.addBillingTeamPatientInsurance(insuranceInfo, patient, tebraCaseDetails, tebraInsuranceData)
        const requestHeaders =  tebraCommon.requestHeader(soapAction)
        let patientDataForLogs = { 'patientId': patient._id }

        console.log("soapRequest>>>>",soapRequest)

        axios.post(tebraCredentials?.wsdlUrl, soapRequest, requestHeaders ).then(async response => {
            console.log('Response >>>>>:', response);
            console.log('Response Data>>>>:', response.data);
            let { parseError, parseResult} = tebraCommon.parseXMLResponse(response.data)
            console.log("parseResult>>>>",parseResult)
            if(!parseError){
                const errorResponse = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult']['ErrorResponse'];
                if(errorResponse && errorResponse?.IsError=='false'){
                    const patientTebraRes = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult'];

                    console.log('========Patient updated successfully=========:',patientTebraRes);
                }
            }
            // Tebra Logs
            tebraCommon.tebraApiLog('addBillingTeamPatientInsurance',soapRequest,parseResult,'success',patientDataForLogs,'')
        }).catch(error => {
            console.error('========addBillingTeamPatientInsurance API Error=========:', error);
            tebraCommon.tebraApiLog('addBillingTeamPatientInsurance',soapRequest,'','apiError',patientDataForLogs,error)
        });

    } catch (error) {
        console.log("========addBillingTeamPatientInsurance=========:", error)
        tebraCommon.tebraApiLog('addBillingTeamPatientInsurance',soapRequest,'','catchError',patientDataForLogs,error)
    }
};



const createCase = async (patientRes, caseName, caseId) => {
    try {
        const soapAction = 'http://www.kareo.com/api/schemas/KareoServices/UpdatePatient'
        const soapRequest = tebraSoapRequest.createCase(patientRes, caseName)
        const requestHeaders =  tebraCommon.requestHeader(soapAction)
        let dataForLogs = { 'patientId': patientRes._id, 'caseId':caseId}

        console.log("soapRequest>>>>",soapRequest)

        axios.post(tebraCredentials?.wsdlUrl, soapRequest, requestHeaders ).then(async response => {
            console.log('Response >>>>>:', response);
            console.log('Response Data>>>>:', response.data);

            let { parseError, parseResult} = tebraCommon.parseXMLResponse(response.data)
            console.log("parseResult>>>>",parseResult)
            if(!parseError){
                const errorResponse = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult']['ErrorResponse'];
                if(errorResponse && errorResponse?.IsError=='false'){
                    const patientTebraRes = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult'];
                    const caseRes = parseResult['s:Envelope']['s:Body']['UpdatePatientResponse']['UpdatePatientResult']['Cases']['PatientCaseRes'];

                    // Save tebra response object in case collection
                    let insertObject ={
                        'tebraDetails':{
                            CaseID: caseRes?.CaseID,
                            PatientID: patientTebraRes?.PatientID,
                            PracticeID: patientTebraRes?.PracticeID,
                            PracticeName: patientTebraRes?.PracticeName
                        },
                        caseCreatedOnTebra: true
                    }
                    console.log("insertObject>>>>",insertObject)
                    console.log("caseId>>>>",caseId)
                    await Case.updateOne({ _id: caseId }, { $set: insertObject });
                    console.log('========Case created successfully=========:',patientTebraRes);
                }
            }
            // Tebra Logs
            tebraCommon.tebraApiLog('createCase',soapRequest,parseResult,'success',dataForLogs,'')
        }).catch(error => {
            console.error('========createCase API Error=========:', error);
            tebraCommon.tebraApiLog('createCase',soapRequest,'','apiError',dataForLogs,error)
        });

    } catch (error) {
        console.log("========createCase=========:", error)
        tebraCommon.tebraApiLog('createCase',soapRequest,'','catchError',dataForLogs,error)
    }
};

const testAPI = async (req, res) => {

    let patientData = {
        firstName: 'Belaska',
        middleName: 'Test', 
        lastName: 'Austin',
        email: 'ashishb+103@arkenea.com',
        dob: '1980-10-09T18:30:00.000Z', 
        gender: 'Male', 
        phoneNumber: '(356) 677-6666',
        cellPhoneNumber: '',
        workExtensionNumber: '',
        salt: '$2b$10$zq0loLq0hFM0okw0tnIMCe',
        hash_password: '$2b$10$zq0loLq0hFM0okw0tnIMCeT4lF6p7teNkirLPUUTTwyo0AyvDN/E.',
        address1: 'New street',
        address2: '123',
        city: 'Aripeka', 
        state: 'FL', 
        zipcode: '12333', 
        documents_type: "Driver's License",
        document_name: 'default.png',
        document_temp_name: '1731673593814.png',
        document_size: '6.32 KB',
        acceptConsent: true,
        failedAttempts: 0,
        loginCount: 0,
        signupToken: '',
        profileImage: 'default.png',
        status: 'Active',
        _id: new ObjectId('6737735722112281430b5fcd'),
        createdAt: '2024-11-15T12:26:40.993Z',
        updatedAt: '2024-11-15T12:26:40.993Z',
        __v: 0
    }
   
    createPatient(patientData)
};

module.exports = {
    getPractices,
    createPatient,
    updatePatientPersonalInfo,
    updatePatientAdditionalInfo,
    updatePatientIntakeFormPersonalInfo,
    addPatientInsuranceIntakeForm,
    manageAuthorization,
    addBillingTeamPatientInsurance,
    createCase,
    testAPI
};