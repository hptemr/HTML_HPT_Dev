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

module.exports = {
    sendResponse,
    generateToken,
    generateRandomPassword
};