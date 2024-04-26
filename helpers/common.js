const CryptoJS = require('crypto-js');

const sendResponse = (res, type, data, message) => {
    switch (type) {
      case 'success':
        return res.status(200).json({ error: false, data, message });
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
  const length = 8
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
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