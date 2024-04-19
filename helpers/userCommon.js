const User = require('../models/userModel');
const practiceLocation = require('../models/practiceLocationModel');
const role = require('../models/roleModel');

const userGetByEmail = async (email) => {
    const existingUser = await User.findOne({ email });
    return existingUser
}

const userGetById = async (_id) => {
    const userData = await User.findOne({ _id });
    return userData
} 

const locationByCode = async (locationCode) => {
    const locationData = await practiceLocation.findOne({ locationCode });
    return locationData
} 

const roleByCode = async (code) => {
    const locationData = await role.findOne({ code });
    return locationData
} 

module.exports = {
    userGetByEmail,
    userGetById,
    locationByCode,
    roleByCode
};