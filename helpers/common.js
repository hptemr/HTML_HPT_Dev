const CryptoJS = require('crypto-js');
const _ = require('lodash');

const sendResponse = (res, type, data, message) => {
    switch (type) {
      case 'success':
        return res.status(200).json({ error: false, data, message });
      case 'errorValidation':
        return res.status(200).json({ error: true, data, message });
      case 'created':
        return res.status(201).json({ error: false, data, message });
      case 'error':
        return res.status(500).json({ error: true, message });
      case 'unauthorized':
        return res.status(401).json({ error: true, message });
      case 'notFound':
        return res.status(404).json({ error: true, message });
      case 'info':
        return res.status(400).json({ error: true, message });
      default:
        return res.status(200).json({ error: false, data, message });
    }
};

const generateToken = (n) =>{
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var token = '';
  for (var i = 0; i < n; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

const generateRandomPassword = () =>{
  let alpha = 3
  let capital = 1
  let numbers = 3
  let special = 1
  const alphaChars = 'abcdefghijklmnopqrstuvwxyz';
  const capitalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const specialChars = '!$%&*=+?';
  const pickedChars = _.sampleSize(alphaChars, alpha)
    .concat(_.sampleSize(capitalChars, capital))
    .concat(_.sampleSize(numberChars, numbers))
    .concat(_.sampleSize(specialChars, special));
  return _.shuffle(pickedChars).join('');
}


const encryptData = (data, key) =>{
  const jsonString = JSON.stringify(data);
  const encryptString = CryptoJS.AES.encrypt(jsonString, key).toString();
  const base64Encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptString));
  return base64Encoded;
}

const decryptData = (data, key) =>{
  const ciphertext = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  const decryptedData = CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);
  const decryptedtString = JSON.parse(decryptedData);
  return decryptedtString;
}


module.exports = {
    sendResponse,
    generateToken,
    generateRandomPassword,
    encryptData,
    decryptData
};