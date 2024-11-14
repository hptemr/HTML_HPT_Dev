const xml2js = require('xml2js');

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


module.exports = {
  requestHeader,
  parseXMLResponse,
};