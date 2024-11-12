require('dotenv').config();
const commonHelper = require('../helpers/common');
const { commonMessage } = require('../helpers/message');
const https = require('https')
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const parser = new XMLParser();
const soap = require('soap');

const createPatients = async (req, res) => {
    try {
        // Tebra API key
        const customerKey = 'n87kg43ms26w';
        const user = 'ahptehr@gmail.com';
        const password = 'Arkenea@2024';
        const wsdlUrl = 'https://webservice.kareo.com/services/soap/2.1/KareoServices.svc?singleWsdl';

        const patientParams = {
            RequestHeader: {
                User: user,
                Password: password,
                CustomerKey: customerKey
            },
            Patient: {
                Practice: {
                    PracticeID:"12345",
                    PracticeName:"HNBC"
                },
                FirstName: 'Ashish',
                LastName: 'Bhoyar'
            }
        };

        // Create a SOAP client and make the request
        soap.createClient(wsdlUrl, (err, client) => {
            if (err) {
                console.error("Error creating SOAP client>>>:", err);
            }

            client.CreatePatient({ request: patientParams }, (err, result) => {
                if (err) {
                    console.error("Error calling CreatePatient:", err);
                }
                console.log("result>>>",result)
            });
        });

        commonHelper.sendResponse(res, 'success', null, "Patient get successfully");

    } catch (error) {
        console.log("========getPatients=========", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};

module.exports = {
    createPatients
};