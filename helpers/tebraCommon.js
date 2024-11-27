const xml2js = require('xml2js');
const moment = require('moment');
const TebraLogs= require("../models/tebraLogsModel");

const requestHeader = (soapAction) => {
  let reqHeader = {
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': soapAction
        }
    }
  return reqHeader
}


const parseXMLResponse = (responseData) => {
  let res = { parseError: true, parseResult:''}
  xml2js.parseString(responseData, { explicitArray: false }, (err, result) => {
    if (err) {
       console.error('Error parsing XML:', err);
       res = { parseError: true, parseResult:''}
    } else {
        res = { parseError: false , parseResult: result }
    }
  });
  return res
}

const changeDateFormat = (date) => {
  if (date) {
    return moment(date).format('YYYY-MM-DD')
  }
  return date;
}

// Save tebra api request and response
const tebraApiLog = (apiMethod,xmlRequest,xmlResponse,status,otherData,errorData) => {
  // save here
  let Rinsert = new TebraLogs()
  Rinsert.apiMethod = apiMethod;
  Rinsert.xmlRequest = xmlRequest;
  Rinsert.xmlResponse = xmlResponse;
  Rinsert.status = status;
  Rinsert.otherData = otherData;
  Rinsert.errorData = errorData;
  Rinsert.save();
}

const escapeCodeString = (realText) =>{
  if (realText) {
    realText = realText.toString().replace("&", "&amp;");
    realText = realText.toString().replace("<", "&lt;");
    realText = realText.toString().replace(">", "&gt;");
  }
  return realText;
}

module.exports = {
  requestHeader,
  parseXMLResponse,
  changeDateFormat,
  escapeCodeString,
  tebraApiLog
};