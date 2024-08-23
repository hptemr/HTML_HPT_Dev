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

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password validation
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

// Name validation
function validateName(name) {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
}

module.exports = {
    userGetByEmail,
    userGetById,
    roleByCode,
    patientGetByEmail,
    patientGetById,
    validateEmail,
    validatePassword,
    validateName
};