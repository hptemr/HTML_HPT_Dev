require('dotenv').config();
const commonHelper = require('../helpers/common');
const { commonMessage } = require('../helpers/message');
const axios = require('axios');
const xml2js = require('xml2js');
const tebraCommon = require('../helpers/tebraCommon');
const { tebraCredentials } = require('./../config/constants')
const tebraSoapRequest = require('../helpers/tebraSoapRequest');

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


const GetPractices = async (req, res) => {
    try {
        const soapAction = 'http://www.kareo.com/api/schemas/KareoServices/GetPractices'
        const soapRequest = tebraSoapRequest.getPracice()
        const requestHeaders =  tebraCommon.requestHeader(soapAction)

        axios.post(tebraCredentials.wsdlUrl, soapRequest, requestHeaders ).then(response => {
            console.log('Response >>>>>:', response);
            console.log('Response Data>>>>:', response.data);

            let { parseError, parseResult} = tebraCommon.parseXMLResponse(response.data)
            if(!parseError){
                const practicesResponse = parseResult['s:Envelope']['s:Body']['GetPracticesResponse']['GetPracticesResult']['Practices'];
                console.log('practicesResponse:', practicesResponse);
                const errorResponse = parseResult['s:Envelope']['s:Body']['GetPracticesResponse']['GetPracticesResult']['ErrorResponse'];
                console.log('errorResponse:', errorResponse);
            }

            // xml2js.parseString(response.data, { explicitArray: false }, (err, result) => {
            //     if (err) {
            //        console.error('Error parsing XML:', err);
            //     } else {
                    
            //         const practicesResponse = result['s:Envelope']['s:Body']['GetPracticesResponse']['GetPracticesResult']['Practices'];
            //         console.log('practicesResponse:', practicesResponse);
            //         const errorResponse = result['s:Envelope']['s:Body']['GetPracticesResponse']['GetPracticesResult']['ErrorResponse'];
            //         console.log('errorResponse:', errorResponse);
            //         // const practiceName = result['s:Envelope']['s:Body']['GetPracticesResponse']['GetPracticesResult']['Practices']['PracticeData']['PracticeName'];
            //     }
            // });
            
        }).catch(error => {
            console.error('Error:', error);
        });

        commonHelper.sendResponse(res, 'success', null, "Practices get successfully");

    } catch (error) {
        console.log("========GetPractices=========", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
};

module.exports = {
    GetPractices
};