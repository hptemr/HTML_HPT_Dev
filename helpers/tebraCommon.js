const xml2js = require('xml2js');
const moment = require('moment');
const TebraLogs= require("../models/tebraLogsModel");
const format = require('xml-formatter');

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

const convertPhoneNumber = (phoneNumber) =>{
  if (phoneNumber) {
    phoneNumber = phoneNumber.replace(/\D/g, '');
  }
  return phoneNumber;
}


const calculateUnitCharges = (directCodes) =>{
  // const result = [];
  // for (const value of Object.values(directCodes)) {
  //   if (value?.minutes && value?.units) {
  //     const units = parseInt(value?.units, 10);
  //     const chargePerUnit = parseFloat(value?.chargePerUnit);
  //     result.push({
  //       units: value.units,
  //       minutes: value.minutes,
  //       cptCode: value.cptCode,
  //       chargePerUnit: chargePerUnit,
  //       totalCharge: units * chargePerUnit
  //     });
  //   }
  // }
  // return result;

  // const result = [];
  // for (const [codeName, value] of Object.entries(directCodes)) {
  //   if (value?.minutes && value?.units) {
  //     const units = parseInt(value?.units, 10);
  //     const chargePerUnit = parseFloat(value?.chargePerUnit);
  //     result.push({
  //       codeName: codeName,
  //       units: value.units.toString(),
  //       minutes: value.minutes.toString(),
  //       cptCode: value.cptCode.toString(),
  //       chargePerUnit: chargePerUnit,
  //       totalCharge: (units * chargePerUnit).toString()
  //     });
  //   }
  // }
  // return result;

  const result = [];
  for (const [codeName, value] of Object.entries(directCodes)) {
    if (value?.units) {
      const units = parseInt(value?.units, 10);
      const chargePerUnit = parseFloat(value?.chargePerUnit);
      result.push({
        codeName: codeName,
        units: value.units.toString(),
        minutes: (value?.minutes) ? value.minutes.toString():'',
        cptCode: value.cptCode.toString(),
        chargePerUnit: chargePerUnit,
        // totalCharge: (units * chargePerUnit).toString()
        totalCharge: chargePerUnit.toString()
      });
    }
  }
  return result;
}

const calculateQuantityCharges = (directCodes) =>{
  const result = [];
  for (const [codeName, value] of Object.entries(directCodes)) {
    if (value?.quantity && value?.cptCode && value?.chargePerUnit) {
      const quantity = parseInt(value?.quantity, 10);
      const chargePerUnit = parseFloat(value?.chargePerUnit);
      result.push({
        codeName: codeName,
        units: value.quantity.toString(),
        minutes: (value?.minutes) ? value.minutes.toString():'',
        cptCode: value.cptCode.toString(),
        chargePerUnit: chargePerUnit,
        // totalCharge: (quantity * chargePerUnit).toString()
        totalCharge:  chargePerUnit.toString()
      });
    }
  }
  return result;
}

const calculateAdditionalCptCodeCharges = (directCodes) =>{
  const result = [];
  for (const value of directCodes) {
    if (value?.quantity && value?.cptCode && value?.charges) {
      result.push({
        codeName: '',
        units: value.quantity.toString(),
        minutes: '',
        cptCode: value.cptCode.toString(),
        chargePerUnit: value?.charges.toString(),
        totalCharge:  value?.charges.toString()
      });
    }
  }
  return result;
}


function formatXML(xmlString) {
  return format(xmlString, {
    indentation: '  ', // Two spaces
    collapseContent: true, // Inline short tags
  });
}


module.exports = {
  requestHeader,
  parseXMLResponse,
  changeDateFormat,
  escapeCodeString,
  tebraApiLog,
  convertPhoneNumber,
  calculateUnitCharges,
  formatXML,
  calculateQuantityCharges,
  calculateAdditionalCptCodeCharges
};