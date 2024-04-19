require('dotenv').config();
const jwt = require('jsonwebtoken');
const commonHelper = require('../helpers/common');

function verifyToken(req, res, next) {
    const tokenWithBearer = req.header('Authorization');
    const token = tokenWithBearer ? tokenWithBearer.split(' ')[1]:''; // Return token without Bearer
    if (!token) return commonHelper.sendResponse(res, 'unauthorized', null, 'Access denied');
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded._id;
        next();
    } catch (error) {
        commonHelper.sendResponse(res, 'unauthorized', null, 'Invalid token');
    }
 };

module.exports = verifyToken;