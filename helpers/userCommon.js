const User = require('../models/userModel');
const role = require('../models/roleModel');
const Patient = require('../models/patientModel');

const userGetByEmail = async (email) => {
    const existingUser = await User.findOne({ email });
    return existingUser
}

const userGetById = async (_id) => {
    const userData = await User.findOne({ _id });
    return userData
} 

const roleByCode = async (code) => {
    const locationData = await role.findOne({ code });
    return locationData
} 

const patientGetById = async (_id) => {
    const userData = await Patient.findOne({ _id });
    return userData
} 

const patientGetByEmail = async (email) => {
    const existingUser = await Patient.findOne({ email });
    return existingUser
}

module.exports = {
    userGetByEmail,
    userGetById,
    roleByCode,
    patientGetByEmail,
    patientGetById
};